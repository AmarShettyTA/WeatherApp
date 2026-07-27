import { WeatherCodeInfo } from '../types';

export const WMO_CODE_MAP: Record<number, WeatherCodeInfo> = {
  0: {
    code: 0,
    label: 'CLEAR SKY',
    description: 'Crisp & sunny skies with zero cloud obstruction',
    iconType: 'sun',
    pixelColor: '#f59e0b',
    badgeBg: 'bg-amber-500/20 border-amber-500 text-amber-300',
    badgeText: 'text-amber-400',
  },
  1: {
    code: 1,
    label: 'MAINLY CLEAR',
    description: 'Mostly sunny with light pixel clouds',
    iconType: 'partly-cloudy',
    pixelColor: '#fbbf24',
    badgeBg: 'bg-amber-400/20 border-amber-400 text-amber-200',
    badgeText: 'text-amber-300',
  },
  2: {
    code: 2,
    label: 'PARTLY CLOUDY',
    description: 'Scattered clouds floating across the horizon',
    iconType: 'partly-cloudy',
    pixelColor: '#38bdf8',
    badgeBg: 'bg-sky-500/20 border-sky-400 text-sky-200',
    badgeText: 'text-sky-300',
  },
  3: {
    code: 3,
    label: 'OVERCAST',
    description: 'Dense pixel cloud cover overhead',
    iconType: 'cloud',
    pixelColor: '#94a3b8',
    badgeBg: 'bg-slate-500/20 border-slate-400 text-slate-200',
    badgeText: 'text-slate-300',
  },
  45: {
    code: 45,
    label: 'FOGGY',
    description: 'Thick low-lying mist reducing visibility',
    iconType: 'fog',
    pixelColor: '#cbd5e1',
    badgeBg: 'bg-slate-400/20 border-slate-300 text-slate-100',
    badgeText: 'text-slate-300',
  },
  48: {
    code: 48,
    label: 'RIME FOG',
    description: 'Depositing rime ice mist on pixel surfaces',
    iconType: 'fog',
    pixelColor: '#93c5fd',
    badgeBg: 'bg-blue-400/20 border-blue-300 text-blue-100',
    badgeText: 'text-blue-300',
  },
  51: {
    code: 51,
    label: 'LIGHT DRIZZLE',
    description: 'Gentle sprinkle of pixel raindrops',
    iconType: 'drizzle',
    pixelColor: '#38bdf8',
    badgeBg: 'bg-cyan-500/20 border-cyan-400 text-cyan-200',
    badgeText: 'text-cyan-300',
  },
  53: {
    code: 53,
    label: 'MODERATE DRIZZLE',
    description: 'Steady light rain shower in progress',
    iconType: 'drizzle',
    pixelColor: '#0284c7',
    badgeBg: 'bg-sky-600/20 border-sky-500 text-sky-200',
    badgeText: 'text-sky-300',
  },
  55: {
    code: 55,
    label: 'HEAVY DRIZZLE',
    description: 'Continuous misting rainfall',
    iconType: 'drizzle',
    pixelColor: '#0369a1',
    badgeBg: 'bg-sky-700/20 border-sky-600 text-sky-100',
    badgeText: 'text-sky-200',
  },
  56: {
    code: 56,
    label: 'FREEZING DRIZZLE',
    description: 'Chilly icy drizzle freezing on impact',
    iconType: 'drizzle',
    pixelColor: '#a5f3fc',
    badgeBg: 'bg-teal-400/20 border-teal-300 text-teal-100',
    badgeText: 'text-teal-200',
  },
  57: {
    code: 57,
    label: 'DENSE FREEZING DRIZZLE',
    description: 'Heavy freezing drizzle with icy conditions',
    iconType: 'drizzle',
    pixelColor: '#67e8f9',
    badgeBg: 'bg-teal-500/20 border-teal-400 text-teal-100',
    badgeText: 'text-teal-200',
  },
  61: {
    code: 61,
    label: 'SLIGHT RAIN',
    description: 'Light rainfall active in the region',
    iconType: 'rain',
    pixelColor: '#38bdf8',
    badgeBg: 'bg-sky-500/20 border-sky-400 text-sky-200',
    badgeText: 'text-sky-300',
  },
  63: {
    code: 63,
    label: 'MODERATE RAIN',
    description: 'Steady rainfall active',
    iconType: 'rain',
    pixelColor: '#0284c7',
    badgeBg: 'bg-blue-600/20 border-blue-400 text-blue-200',
    badgeText: 'text-blue-300',
  },
  65: {
    code: 65,
    label: 'HEAVY RAIN',
    description: 'Torrential pixel downpour falling',
    iconType: 'rain',
    pixelColor: '#1d4ed8',
    badgeBg: 'bg-blue-800/30 border-blue-500 text-blue-100',
    badgeText: 'text-blue-300',
  },
  66: {
    code: 66,
    label: 'FREEZING RAIN',
    description: 'Sleet and freezing rain making roads slippery',
    iconType: 'rain',
    pixelColor: '#38bdf8',
    badgeBg: 'bg-cyan-600/20 border-cyan-400 text-cyan-200',
    badgeText: 'text-cyan-300',
  },
  67: {
    code: 67,
    label: 'HEAVY FREEZING RAIN',
    description: 'Severe freezing rain storm',
    iconType: 'rain',
    pixelColor: '#0284c7',
    badgeBg: 'bg-cyan-700/30 border-cyan-500 text-cyan-100',
    badgeText: 'text-cyan-200',
  },
  71: {
    code: 71,
    label: 'SLIGHT SNOW',
    description: 'Gentle pixel snowflakes drifting down',
    iconType: 'snow',
    pixelColor: '#e0f2fe',
    badgeBg: 'bg-sky-100/10 border-sky-200 text-sky-100',
    badgeText: 'text-sky-200',
  },
  73: {
    code: 73,
    label: 'MODERATE SNOW',
    description: 'Steady snowfall accumulating on surfaces',
    iconType: 'snow',
    pixelColor: '#bae6fd',
    badgeBg: 'bg-sky-200/20 border-sky-300 text-sky-100',
    badgeText: 'text-sky-200',
  },
  75: {
    code: 75,
    label: 'HEAVY SNOW',
    description: 'Blizzard-like heavy snowfall active',
    iconType: 'snow',
    pixelColor: '#7dd3fc',
    badgeBg: 'bg-blue-300/20 border-blue-200 text-blue-100',
    badgeText: 'text-blue-200',
  },
  77: {
    code: 77,
    label: 'SNOW GRAINS',
    description: 'Tiny icy frozen snow grains falling',
    iconType: 'snow',
    pixelColor: '#cbd5e1',
    badgeBg: 'bg-slate-300/20 border-slate-200 text-slate-100',
    badgeText: 'text-slate-200',
  },
  80: {
    code: 80,
    label: 'SLIGHT RAIN SHOWERS',
    description: 'Passing rain showers with clear breaks',
    iconType: 'rain',
    pixelColor: '#38bdf8',
    badgeBg: 'bg-sky-500/20 border-sky-400 text-sky-200',
    badgeText: 'text-sky-300',
  },
  81: {
    code: 81,
    label: 'MODERATE SHOWERS',
    description: 'Frequent heavy rain showers',
    iconType: 'rain',
    pixelColor: '#0284c7',
    badgeBg: 'bg-blue-600/20 border-blue-400 text-blue-100',
    badgeText: 'text-blue-300',
  },
  82: {
    code: 82,
    label: 'VIOLENT SHOWERS',
    description: 'Sudden intense downpours with heavy wind',
    iconType: 'rain',
    pixelColor: '#1e40af',
    badgeBg: 'bg-indigo-700/30 border-indigo-400 text-indigo-100',
    badgeText: 'text-indigo-200',
  },
  85: {
    code: 85,
    label: 'SLIGHT SNOW SHOWERS',
    description: 'Passing snow flurries',
    iconType: 'snow',
    pixelColor: '#e0f2fe',
    badgeBg: 'bg-sky-200/20 border-sky-300 text-sky-100',
    badgeText: 'text-sky-200',
  },
  86: {
    code: 86,
    label: 'HEAVY SNOW SHOWERS',
    description: 'Heavy snow flurries with gusty winds',
    iconType: 'snow',
    pixelColor: '#bae6fd',
    badgeBg: 'bg-sky-300/20 border-sky-200 text-sky-100',
    badgeText: 'text-sky-200',
  },
  95: {
    code: 95,
    label: 'THUNDERSTORM',
    description: 'Lightning strikes and atmospheric pixel thunder',
    iconType: 'storm',
    pixelColor: '#eab308',
    badgeBg: 'bg-yellow-500/20 border-yellow-400 text-yellow-200',
    badgeText: 'text-yellow-300',
  },
  96: {
    code: 96,
    label: 'THUNDERSTORM + HAIL',
    description: 'Severe thunderstorm accompanied by light hail',
    iconType: 'storm',
    pixelColor: '#f97316',
    badgeBg: 'bg-amber-600/30 border-amber-400 text-amber-100',
    badgeText: 'text-amber-300',
  },
  99: {
    code: 99,
    label: 'HEAVY HAILSTORM',
    description: 'Dangerous thunderstorm with large hail pieces',
    iconType: 'storm',
    pixelColor: '#ef4444',
    badgeBg: 'bg-rose-600/30 border-rose-400 text-rose-100',
    badgeText: 'text-rose-300',
  },
};

export function getWMOInfo(code: number, isDay: number = 1): WeatherCodeInfo {
  const base = WMO_CODE_MAP[code] || {
    code,
    label: 'UNKNOWN WEATHER',
    description: 'Variable weather conditions detected',
    iconType: 'cloud',
    pixelColor: '#94a3b8',
    badgeBg: 'bg-slate-500/20 border-slate-400 text-slate-200',
    badgeText: 'text-slate-300',
  };

  if (isDay === 0 && (base.iconType === 'sun' || base.iconType === 'partly-cloudy')) {
    return {
      ...base,
      label: base.code === 0 ? 'CLEAR NIGHT' : 'PARTLY CLOUDY NIGHT',
      iconType: base.code === 0 ? 'moon' : 'partly-cloudy',
      pixelColor: '#a78bfa',
      badgeBg: 'bg-purple-500/20 border-purple-400 text-purple-200',
      badgeText: 'text-purple-300',
    };
  }

  return base;
}

export function formatTemp(celsius: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    const fahrenheit = Math.round((celsius * 9) / 5 + 32);
    return `${fahrenheit}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function convertWindSpeed(kmh: number, imperial: boolean = false): { value: number; unit: string } {
  if (imperial) {
    return { value: Math.round(kmh * 0.621371), unit: 'mph' };
  }
  return { value: Math.round(kmh), unit: 'km/h' };
}

export function getWindDirectionLabel(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}
