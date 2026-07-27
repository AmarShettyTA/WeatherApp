import React from 'react';
import { Clock, CloudRain, Wind } from 'lucide-react';
import { HourlyWeatherData, TemperatureUnit } from '../types';
import { getWMOInfo, formatTemp, convertWindSpeed } from '../utils/wmoCodes';
import { PixelWeatherIcon } from './PixelWeatherIcon';

interface HourlyTimelineProps {
  hourly?: HourlyWeatherData;
  unit: TemperatureUnit;
  dayIndex?: number;
}

export const HourlyTimeline: React.FC<HourlyTimelineProps> = ({
  hourly,
  unit,
  dayIndex = 0,
}) => {
  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return null;
  }

  const startIdx = dayIndex * 24;
  const endIdx = startIdx + 24;

  const hoursTime = hourly.time.slice(startIdx, endIdx);
  const temps = hourly.temperature_2m.slice(startIdx, endIdx);
  const codes = hourly.weather_code.slice(startIdx, endIdx);
  const probs = hourly.precipitation_probability.slice(startIdx, endIdx);
  const winds = hourly.wind_speed_10m.slice(startIdx, endIdx);

  const isImperial = unit === 'F';

  const formatHour = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return '';
    }
  };

  const getDayLabel = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase();
    } catch {
      return '';
    }
  };

  const selectedDayLabel = hoursTime[0] ? getDayLabel(hoursTime[0]) : 'SELECTED DAY';

  return (
    <section className="w-full bg-zinc-900 border-4 border-white p-4 md:p-5 shadow-brutal-white font-mono space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-zinc-700 pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-white text-black px-2 py-0.5 text-xs font-bold uppercase">
            24-HOUR
          </span>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            // HOURLY_TIMELINE
          </h3>
        </div>
        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>{selectedDayLabel}</span>
        </div>
      </div>

      {/* Horizontal Scrollable Hourly Timeline */}
      <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
        <div className="flex items-stretch gap-3 min-w-max">
          {hoursTime.map((timeStr, idx) => {
            const hourLabel = formatHour(timeStr);
            const temp = temps[idx] ?? 0;
            const code = codes[idx] ?? 0;
            const rainProb = probs[idx] ?? 0;
            const wind = winds[idx] ?? 0;
            const windInfo = convertWindSpeed(wind, isImperial);

            const hourNum = new Date(timeStr).getHours();
            const isDay = hourNum >= 6 && hourNum <= 19 ? 1 : 0;
            const wmo = getWMOInfo(code, isDay);

            return (
              <div
                key={timeStr}
                className="w-24 bg-zinc-950 border-2 border-zinc-800 hover:border-white p-3 flex flex-col items-center justify-between space-y-3 font-mono text-xs transition shadow-brutal-zinc shrink-0"
              >
                {/* Time */}
                <span className="text-[11px] font-bold text-emerald-400 border-b border-zinc-800 pb-1 w-full text-center">
                  {hourLabel}
                </span>

                {/* Pixel Icon */}
                <div className="py-1">
                  <PixelWeatherIcon type={wmo.iconType} size="sm" />
                </div>

                {/* Temperature */}
                <span className="font-black text-white text-sm">
                  {formatTemp(temp, unit)}
                </span>

                {/* Rain Probability Mini Bar */}
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-300 font-bold">
                    <CloudRain className="w-3 h-3 text-emerald-400" />
                    <span>{rainProb}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 border border-zinc-700 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all"
                      style={{ width: `${rainProb}%` }}
                    />
                  </div>
                </div>

                {/* Wind */}
                <div className="text-[10px] text-zinc-400 flex items-center gap-1 border-t border-zinc-800 pt-1.5 w-full justify-center">
                  <Wind className="w-3 h-3 text-zinc-500" />
                  <span>{windInfo.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

