import React, { useState, useEffect, useRef } from 'react';
import { Search, Navigation, X, MapPin, History, Loader2 } from 'lucide-react';
import { LocationResult } from '../types';
import { searchLocations, reverseGeocode, DEFAULT_LOCATIONS } from '../services/openMeteo';
import { soundFx } from '../utils/audio';

interface LocationSearchBarProps {
  currentLocation: LocationResult;
  onSelectLocation: (location: LocationResult) => void;
}

export const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  currentLocation,
  onSelectLocation,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<LocationResult[]>(() => {
    try {
      const saved = localStorage.getItem('pixel_weather_recent');
      return saved ? JSON.parse(saved) : DEFAULT_LOCATIONS.slice(0, 4);
    } catch {
      return DEFAULT_LOCATIONS.slice(0, 4);
    }
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search trigger
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      const res = await searchLocations(query);
      setResults(res);
      setIsLoading(false);
      setIsOpen(true);
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (loc: LocationResult) => {
    soundFx.playSelect();
    onSelectLocation(loc);
    setQuery('');
    setIsOpen(false);

    // Save to recent searches
    const updated = [loc, ...recentSearches.filter((item) => item.id !== loc.id)].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('pixel_weather_recent', JSON.stringify(updated));
    } catch (e) {
      // Ignore quota errors
    }
  };

  const handleGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    soundFx.playClick();
    setIsGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = await reverseGeocode(latitude, longitude);
        setIsGpsLoading(false);
        handleSelect(loc);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsGpsLoading(false);
        alert('Could not retrieve your location. Please type a city name in the search bar.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full space-y-3" ref={wrapperRef}>
      <div className="flex flex-col md:flex-row items-stretch gap-2">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="relative flex items-center bg-zinc-900 border-2 border-white p-2 shadow-brutal-white focus-within:border-emerald-400 transition">
            <span className="text-emerald-400 font-mono font-bold text-sm ml-1 mr-2 select-none">$</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length >= 2 && setIsOpen(true)}
              placeholder="SEARCH CITY OR REGION (e.g. Tokyo, London, Austin)..."
              className="w-full bg-transparent text-white placeholder-zinc-600 font-mono text-xs focus:outline-none uppercase"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  soundFx.playClick();
                }}
                className="p-1 text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {isLoading && (
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin mr-2" />
            )}
            <button 
              type="button" 
              onClick={() => query.trim().length >= 2 && searchLocations(query).then(res => { setResults(res); setIsOpen(true); })}
              className="bg-white text-black px-2.5 py-1 text-xs font-mono font-bold uppercase shrink-0 hover:bg-emerald-400 transition ml-2"
            >
              SEARCH
            </button>
          </div>

          {/* Autocomplete Dropdown List */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border-2 border-white shadow-brutal-white z-50 max-h-72 overflow-y-auto divide-y divide-zinc-800">
              {results.length > 0 ? (
                results.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className="w-full text-left px-4 py-2.5 hover:bg-zinc-800 flex items-center justify-between group transition font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 group-hover:text-white shrink-0" />
                      <div>
                        <span className="text-white group-hover:text-emerald-400 font-bold">
                          {loc.name}
                        </span>
                        <span className="text-zinc-400 text-[11px] ml-2">
                          {loc.admin1 ? `${loc.admin1}, ` : ''}
                          {loc.country || ''}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
                      {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-zinc-400 font-mono text-xs text-center">
                  NO CITIES FOUND FOR "{query.toUpperCase()}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* GPS Location Button */}
        <button
          onClick={handleGpsLocation}
          disabled={isGpsLoading}
          className="bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border-2 border-white px-4 py-2.5 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-brutal-white disabled:opacity-50 transition"
        >
          {isGpsLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          ) : (
            <Navigation className="w-4 h-4 text-emerald-400" />
          )}
          <span className="uppercase">{isGpsLoading ? 'LOCATING...' : 'GPS LOCATE'}</span>
        </button>
      </div>

      {/* Preset & Recent Search Quick Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
        <span className="text-zinc-500 flex items-center gap-1 uppercase">
          <History className="w-3.5 h-3.5 text-zinc-400" /> QUICK:
        </span>
        {DEFAULT_LOCATIONS.map((preset) => {
          const isSelected = currentLocation.name.toLowerCase() === preset.name.toLowerCase();
          return (
            <button
              key={preset.id}
              onClick={() => handleSelect(preset)}
              className={`px-2.5 py-1 border transition font-mono text-xs uppercase ${
                isSelected
                  ? 'bg-emerald-400 text-black border-white font-bold shadow-brutal-white'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-white hover:text-white'
              }`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
