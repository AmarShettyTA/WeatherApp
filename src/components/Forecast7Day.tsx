import React from 'react';
import { Wind, CloudRain } from 'lucide-react';
import { DailyWeatherData, TemperatureUnit } from '../types';
import { getWMOInfo, formatTemp, convertWindSpeed } from '../utils/wmoCodes';
import { PixelWeatherIcon } from './PixelWeatherIcon';
import { soundFx } from '../utils/audio';

interface Forecast7DayProps {
  daily: DailyWeatherData;
  unit: TemperatureUnit;
  onSelectDayIndex?: (index: number) => void;
  selectedIndex?: number;
}

export const Forecast7Day: React.FC<Forecast7DayProps> = ({
  daily,
  unit,
  onSelectDayIndex,
  selectedIndex = 0,
}) => {
  const isImperial = unit === 'F';

  const allMax = Math.max(...daily.temperature_2m_max);
  const allMin = Math.min(...daily.temperature_2m_min);
  const tempSpan = Math.max(1, allMax - allMin);

  const getDayName = (isoString: string, index: number) => {
    if (index === 0) return 'TODAY';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { weekday: 'short' }).toUpperCase();
    } catch {
      return `DAY ${index + 1}`;
    }
  };

  const formatDateShort = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <section className="w-full bg-zinc-900 border-4 border-white p-4 md:p-5 shadow-brutal-white font-mono space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-white text-black px-2 py-0.5 text-xs font-bold uppercase">
            FORECAST
          </span>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            // 7-DAY_FORECAST
          </h3>
        </div>
        <p className="text-xs text-zinc-400 uppercase hidden sm:block">
          CLICK DAY FOR HOURLY TIMELINE
        </p>
      </div>

      {/* 7-Day Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.time.map((timeStr, idx) => {
          const code = daily.weather_code[idx];
          const wmo = getWMOInfo(code, 1);
          const maxTemp = daily.temperature_2m_max[idx];
          const minTemp = daily.temperature_2m_min[idx];
          const rainProb = daily.precipitation_probability_max[idx] ?? 0;
          const windSpeed = daily.wind_speed_10m_max[idx] ?? 0;
          const windInfo = convertWindSpeed(windSpeed, isImperial);

          const leftPercent = Math.max(0, Math.min(100, ((minTemp - allMin) / tempSpan) * 100));
          const widthPercent = Math.max(10, Math.min(100 - leftPercent, ((maxTemp - minTemp) / tempSpan) * 100));

          const isSelected = selectedIndex === idx;

          return (
            <div
              key={timeStr}
              onClick={() => {
                soundFx.playClick();
                onSelectDayIndex?.(idx);
              }}
              className={`p-3 flex flex-col justify-between space-y-3 cursor-pointer transition border ${
                isSelected
                  ? 'bg-zinc-800 border-2 border-emerald-400 shadow-brutal-emerald'
                  : 'bg-zinc-950 border-zinc-700 hover:border-white hover:bg-zinc-900'
              }`}
            >
              {/* Day & Date Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className={`text-xs font-bold uppercase ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                  {getDayName(timeStr, idx)}
                </span>
                <span className="text-[11px] text-zinc-500">
                  {formatDateShort(timeStr)}
                </span>
              </div>

              {/* Icon & WMO Label */}
              <div className="flex flex-col items-center justify-center py-2 text-center">
                <PixelWeatherIcon type={wmo.iconType} size="md" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase mt-2 line-clamp-1">
                  {wmo.label}
                </span>
              </div>

              {/* Temperatures */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white font-black">{formatTemp(maxTemp, unit)}</span>
                  <span className="text-zinc-400 font-bold">{formatTemp(minTemp, unit)}</span>
                </div>

                {/* Temp Visual Bar */}
                <div className="w-full bg-zinc-900 h-1.5 border border-zinc-700 relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-emerald-400"
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                  />
                </div>
              </div>

              {/* Rain & Wind Badges */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <CloudRain className="w-3 h-3" />
                  {rainProb}%
                </span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Wind className="w-3 h-3 text-zinc-500" />
                  {windInfo.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

