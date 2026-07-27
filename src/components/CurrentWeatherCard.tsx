import React from 'react';
import {
  Wind,
  Droplets,
  Gauge,
  Sun,
  Eye,
  Sunrise,
} from 'lucide-react';
import { LocationResult, TemperatureUnit, WeatherForecast } from '../types';
import { getWMOInfo, formatTemp, convertWindSpeed, getWindDirectionLabel } from '../utils/wmoCodes';
import { PixelWeatherIcon } from './PixelWeatherIcon';

interface CurrentWeatherCardProps {
  location: LocationResult;
  forecast: WeatherForecast;
  unit: TemperatureUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  location,
  forecast,
  unit,
}) => {
  const current = forecast.current;
  const daily = forecast.daily;

  const wmo = getWMOInfo(current.weather_code, current.is_day);
  const isImperial = unit === 'F';
  const windInfo = convertWindSpeed(current.wind_speed_10m, isImperial);
  const windDir = getWindDirectionLabel(current.wind_direction_10m);

  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return '--:--';
    }
  };

  const sunriseStr = formatTime(daily.sunrise?.[0]);
  const sunsetStr = formatTime(daily.sunset?.[0]);
  const uvMax = daily.uv_index_max?.[0] ?? 0;
  const precipProbability = daily.precipitation_probability_max?.[0] ?? 0;

  return (
    <section className="w-full bg-zinc-900 border-4 border-white p-5 md:p-6 shadow-brutal-emerald relative overflow-hidden font-mono">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-zinc-700 pb-4">
        <div>
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">// CURRENT_STATE</span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-2">
            {location.name} <span className="text-zinc-500 font-normal text-lg">({location.country_code || 'GEO'})</span>
          </h2>
        </div>
        <div className="border-2 border-white bg-black px-3 py-1.5 text-xs font-bold text-white uppercase shadow-brutal-white self-start md:self-auto">
          LAT: {forecast.latitude.toFixed(2)}° N // LON: {forecast.longitude.toFixed(2)}° E
        </div>
      </div>

      {/* Main Temperature & Hero Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center border-b-2 border-zinc-700 pb-6">
        <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="p-3 bg-zinc-950 border-2 border-white shadow-brutal-white shrink-0">
            <PixelWeatherIcon type={wmo.iconType} size="xl" />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-6xl md:text-8xl font-black text-white leading-none font-mono tracking-tight">
              {formatTemp(current.temperature_2m, unit)}
            </div>
            <div className="text-xl md:text-2xl uppercase font-bold text-zinc-300 mt-2">
              {wmo.label}
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase font-semibold">
              Feels like {formatTemp(current.apparent_temperature, unit)} • {wmo.description}
            </div>
          </div>
        </div>

        {/* Quick Highlights Box */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 font-mono">
          <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition">
            <div className="text-xs text-zinc-500 uppercase font-bold">Today's High</div>
            <div className="text-xl font-black text-white mt-1">
              {formatTemp(daily.temperature_2m_max[0] ?? current.temperature_2m, unit)}
            </div>
          </div>
          <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition">
            <div className="text-xs text-zinc-500 uppercase font-bold">Today's Low</div>
            <div className="text-xl font-black text-white mt-1">
              {formatTemp(daily.temperature_2m_min[0] ?? current.temperature_2m, unit)}
            </div>
          </div>
          <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition">
            <div className="text-xs text-zinc-500 uppercase font-bold">Rain Chance</div>
            <div className="text-xl font-black text-emerald-400 mt-1">
              {precipProbability}%
            </div>
          </div>
          <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition">
            <div className="text-xs text-zinc-500 uppercase font-bold">UV Max</div>
            <div className="text-xl font-black text-white mt-1">
              {uvMax} <span className="text-xs text-zinc-500 font-normal">/ 11</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Weather Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Wind */}
        <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
            <span>WIND</span>
            <Wind className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-white">
              {windInfo.value} <span className="text-xs text-zinc-400 font-normal">{windInfo.unit}</span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5 uppercase">
              DIR: {windDir} ({current.wind_direction_10m}°)
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
            <span>HUMIDITY</span>
            <Droplets className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-white">
              {current.relative_humidity_2m}%
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5 uppercase">
              MOISTURE LEVEL
            </div>
          </div>
        </div>

        {/* Barometer */}
        <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
            <span>PRESSURE</span>
            <Gauge className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-white">
              {Math.round(current.pressure_msl)} <span className="text-xs text-zinc-400 font-normal">hPa</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5 uppercase font-bold">
              BAROMETER OK
            </div>
          </div>
        </div>

        {/* UV Index */}
        <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
            <span>UV INDEX</span>
            <Sun className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-white">
              {uvMax} <span className="text-xs text-zinc-400 font-normal">MAX</span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5 uppercase">
              {uvMax >= 6 ? 'HIGH UV RISK' : 'MODERATE RISK'}
            </div>
          </div>
        </div>

        {/* Clouds */}
        <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
            <span>CLOUDS</span>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-white">
              {current.cloud_cover}%
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5 uppercase">
              {current.cloud_cover > 70 ? 'OVERCAST' : 'PARTLY CLEAR'}
            </div>
          </div>
        </div>

        {/* Day Cycle */}
        <div className="border-2 border-zinc-700 p-3 bg-zinc-950 hover:border-white transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase">
            <span>SUN CYCLE</span>
            <Sunrise className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-xs space-y-0.5">
            <div className="flex justify-between text-zinc-300">
              <span className="text-zinc-500">RISE:</span>
              <span className="text-white font-bold">{sunriseStr}</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span className="text-zinc-500">SET:</span>
              <span className="text-white font-bold">{sunsetStr}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

