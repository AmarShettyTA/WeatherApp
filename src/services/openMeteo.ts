import { LocationResult, WeatherForecast } from '../types';

export const DEFAULT_LOCATIONS: LocationResult[] = [
  {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.6917,
    country: 'Japan',
    country_code: 'JP',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 2643743,
    name: 'London',
    latitude: 51.5085,
    longitude: -0.1257,
    country: 'United Kingdom',
    country_code: 'GB',
    timezone: 'Europe/London',
  },
  {
    id: 5128581,
    name: 'New York',
    latitude: 40.7143,
    longitude: -74.006,
    country: 'United States',
    country_code: 'US',
    timezone: 'America/New_York',
  },
  {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.8678,
    longitude: 151.2073,
    country: 'Australia',
    country_code: 'AU',
    timezone: 'Australia/Sydney',
  },
  {
    id: 2950159,
    name: 'Berlin',
    latitude: 52.5244,
    longitude: 13.4105,
    country: 'Germany',
    country_code: 'DE',
    timezone: 'Europe/Berlin',
  },
];

/**
 * Searches for location coordinates using Open-Meteo Geocoding API
 */
export async function searchLocations(query: string): Promise<LocationResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        trimmed
      )}&count=8&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error(`Geocoding HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Failed to fetch location suggestions:', error);
    return [];
  }
}

/**
 * Reverse lookup coordinates to get approximate city name
 */
export async function reverseGeocode(lat: number, lon: number): Promise<LocationResult> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(2)},${lon.toFixed(
        2
      )}&count=1&language=en&format=json`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
    }
  } catch (e) {
    console.warn('Reverse geocode fallback:', e);
  }

  return {
    id: Date.now(),
    name: `GPS (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`,
    latitude: lat,
    longitude: lon,
    country: 'Current Location',
    timezone: 'auto',
  };
}

/**
 * Queries Open-Meteo Forecast API for current, 7-day daily, and 24-hr hourly metrics
 */
export async function fetchWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherForecast> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'pressure_msl',
      'wind_speed_10m',
      'uv_index',
    ].join(','),
    timezone: 'auto',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo Forecast API Error ${response.status}`);
  }

  const data: WeatherForecast = await response.json();
  return data;
}
