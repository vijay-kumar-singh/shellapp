import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

export type WeatherData = {
  temperature: number;
  description: string;
  icon: string;
};

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getWeather() {
      try {
        const data = await fetchWeatherData();
        if (mounted && data) {
          setWeather({
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch weather data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getWeather();

    // Refresh weather data every hour
    const interval = setInterval(getWeather, 60 * 60 * 1000);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { weather, loading, error };
}