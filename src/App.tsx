import React, { useState, useEffect } from 'react';
import { LocationResult, RetroTheme, TemperatureUnit, WeatherForecast } from './types';
import { DEFAULT_LOCATIONS, fetchWeatherForecast } from './services/openMeteo';
import { calculateActivityRecommendations } from './utils/activityAdvisor';
import { soundFx } from './utils/audio';
import { PixelHeader } from './components/PixelHeader';
import { LocationSearchBar } from './components/LocationSearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { PlanningModule } from './components/PlanningModule';
import { Forecast7Day } from './components/Forecast7Day';
import { HourlyTimeline } from './components/HourlyTimeline';
import { Loader2, RefreshCw, AlertTriangle, Radio, Terminal, Sparkles } from 'lucide-react';

export default function App() {
  // State initialization with localStorage recovery
  const [currentLocation, setCurrentLocation] = useState<LocationResult>(() => {
    try {
      const saved = localStorage.getItem('pixel_weather_loc');
      return saved ? JSON.parse(saved) : DEFAULT_LOCATIONS[0];
    } catch {
      return DEFAULT_LOCATIONS[0];
    }
  });

  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    try {
      return (localStorage.getItem('pixel_weather_unit') as TemperatureUnit) || 'C';
    } catch {
      return 'C';
    }
  });

  const [theme, setTheme] = useState<RetroTheme>(() => {
    try {
      return (localStorage.getItem('pixel_weather_theme') as RetroTheme) || 'cyberpunk';
    } catch {
      return 'cyberpunk';
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pixel_weather_sound') !== 'false';
    } catch {
      return true;
    }
  });

  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pixel_weather_crt') !== 'false';
    } catch {
      return true;
    }
  });

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Sync soundFx toggle state
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Load weather data whenever location changes
  const loadWeather = async (loc: LocationResult) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherForecast(loc.latitude, loc.longitude);
      setForecast(data);
    } catch (err: unknown) {
      console.error('Failed to load weather forecast:', err);
      setError('COULD NOT CONNECT TO OPEN-METEO WEATHER SATELLITE. PLEASE RETRY.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(currentLocation);
  }, [currentLocation]);

  // Handlers
  const handleSelectLocation = (loc: LocationResult) => {
    setCurrentLocation(loc);
    setSelectedDayIndex(0);
    try {
      localStorage.setItem('pixel_weather_loc', JSON.stringify(loc));
    } catch (e) {
      // Ignore quota error
    }
  };

  const handleToggleUnit = () => {
    const nextUnit = unit === 'C' ? 'F' : 'C';
    setUnit(nextUnit);
    try {
      localStorage.setItem('pixel_weather_unit', nextUnit);
    } catch (e) {
      // Ignore
    }
  };

  const handleChangeTheme = (newTheme: RetroTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('pixel_weather_theme', newTheme);
    } catch (e) {
      // Ignore
    }
  };

  const handleToggleSound = () => {
    const nextSound = !soundEnabled;
    setSoundEnabled(nextSound);
    try {
      localStorage.setItem('pixel_weather_sound', String(nextSound));
    } catch (e) {
      // Ignore
    }
  };

  const handleToggleCrt = () => {
    const nextCrt = !crtEnabled;
    setCrtEnabled(nextCrt);
    try {
      localStorage.setItem('pixel_weather_crt', String(nextCrt));
    } catch (e) {
      // Ignore
    }
  };

  // Recommendations calculation
  const recommendations =
    forecast && forecast.current && forecast.daily
      ? calculateActivityRecommendations(forecast.current, forecast.daily)
      : [];

  // Theme styling background maps
  const getThemeClasses = () => {
    switch (theme) {
      case 'cyberpunk':
        return 'bg-zinc-950 text-zinc-100 selection:bg-emerald-400 selection:text-black';
      case 'classic-dark':
        return 'bg-neutral-950 text-neutral-100 selection:bg-white selection:text-black';
      case 'gameboy':
        return 'bg-[#0f380f] text-[#9bbc0f] selection:bg-[#8bac0f] selection:text-[#0f380f]';
      case 'sunset':
        return 'bg-zinc-900 text-emerald-300 selection:bg-emerald-400 selection:text-black';
      default:
        return 'bg-zinc-950 text-zinc-100';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-mono ${getThemeClasses()} ${crtEnabled ? 'crt-overlay' : ''}`}>
      {/* Header Bar */}
      <PixelHeader
        unit={unit}
        onToggleUnit={handleToggleUnit}
        theme={theme}
        onChangeTheme={handleChangeTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        crtEnabled={crtEnabled}
        onToggleCrt={handleToggleCrt}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Search & Location Bar */}
        <section>
          <LocationSearchBar
            currentLocation={currentLocation}
            onSelectLocation={handleSelectLocation}
          />
        </section>

        {/* Loading Spinner State */}
        {isLoading && (
          <div className="w-full bg-zinc-900 border-4 border-white p-12 text-center shadow-brutal-emerald space-y-4 my-8 font-mono">
            <div className="inline-block p-4 bg-zinc-950 border-2 border-white shadow-brutal-white animate-spin">
              <Loader2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wider animate-pixel-blink uppercase">
              FETCHING OPEN-METEO TELEMETRY DATA...
            </h3>
            <p className="text-xs text-zinc-400 uppercase max-w-md mx-auto">
              CONNECTING TO SATELLITE FORECAST MODELS FOR {currentLocation.name.toUpperCase()}
            </p>
          </div>
        )}

        {/* Error Retry Screen */}
        {error && !isLoading && (
          <div className="w-full bg-zinc-900 border-4 border-white p-8 text-center shadow-brutal-white space-y-4 my-8 font-mono">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto animate-bounce" />
            <h3 className="text-sm font-bold text-rose-300 tracking-wider uppercase">
              ATMOSPHERIC SIGNAL LOST
            </h3>
            <p className="text-xs text-zinc-300 max-w-lg mx-auto uppercase">
              {error}
            </p>
            <button
              onClick={() => {
                soundFx.playClick();
                loadWeather(currentLocation);
              }}
              className="px-4 py-2 bg-white text-black font-bold text-xs uppercase border-2 border-white shadow-brutal-emerald inline-flex items-center gap-2 hover:bg-emerald-400 transition"
            >
              <RefreshCw className="w-4 h-4" /> RETRY CONNECTION
            </button>
          </div>
        )}

        {/* Loaded Forecast Content */}
        {!isLoading && !error && forecast && (
          <div className="space-y-6">
            {/* 1. Current Weather Main Card */}
            <CurrentWeatherCard
              location={currentLocation}
              forecast={forecast}
              unit={unit}
            />

            {/* 2. Planning Advisory Module */}
            <PlanningModule recommendations={recommendations} />

            {/* 3. 7-Day Forecast Grid */}
            <Forecast7Day
              daily={forecast.daily}
              unit={unit}
              selectedIndex={selectedDayIndex}
              onSelectDayIndex={(idx) => setSelectedDayIndex(idx)}
            />

            {/* 4. 24-Hour Timeline */}
            <HourlyTimeline
              hourly={forecast.hourly}
              unit={unit}
              dayIndex={selectedDayIndex}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-zinc-800 bg-zinc-950 py-4 px-4 mt-8 text-center text-xs font-mono text-zinc-500 uppercase tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>OPEN-METEO API • ZERO TRACKING • REAL-TIME METRICS</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>WEATHER_OS v2.0 • CLEAN MINIMALISM SYSTEM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
