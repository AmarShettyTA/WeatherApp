export type TemperatureUnit = 'C' | 'F';

export type RetroTheme = 'cyberpunk' | 'classic-dark' | 'gameboy' | 'sunset';

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string;
  country?: string;
  timezone?: string;
  population?: number;
}

export interface CurrentWeatherData {
  time: string;
  interval?: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number; // 1 for day, 0 for night
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  weather_code: number[];
  pressure_msl: number[];
  wind_speed_10m: number[];
  uv_index: number[];
}

export interface WeatherForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeatherData;
  daily: DailyWeatherData;
  hourly?: HourlyWeatherData;
}

export interface WeatherCodeInfo {
  code: number;
  label: string;
  description: string;
  iconType: 'sun' | 'moon' | 'partly-cloudy' | 'cloud' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm';
  pixelColor: string;
  badgeBg: string;
  badgeText: string;
}

export type ActivityStatus = 'OPTIMAL' | 'MODERATE' | 'NOT_RECOMMENDED' | 'HAZARDOUS';

export interface ActivityRecommendation {
  id: string;
  title: string;
  category: 'sports' | 'gear' | 'outdoors' | 'daily';
  status: ActivityStatus;
  iconName: string;
  score: number; // 1 to 5
  headline: string;
  reasoning: string;
  tip: string;
  metricLabel?: string;
  metricValue?: string;
}
