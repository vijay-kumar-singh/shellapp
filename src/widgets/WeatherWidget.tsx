import React from 'react';
import { Cloud, AlertCircle, Loader } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { useAnalytics } from '../hooks/useAnalytics';

export function WeatherWidget() {
  const { weather, loading, error } = useWeather();
  const { trackEvent } = useAnalytics();

  React.useEffect(() => {
    if (weather) {
      trackEvent('weather_data_loaded', {
        temperature: weather.temperature,
        condition: weather.description,
      });
    }
  }, [weather, trackEvent]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader className="h-8 w-8 mx-auto text-indigo-600 mb-2 animate-spin" />
        <h3 className="text-lg font-semibold mb-2">Weather</h3>
        <p className="text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="text-center">
        <AlertCircle className="h-8 w-8 mx-auto text-red-600 mb-2" />
        <h3 className="text-lg font-semibold mb-2">Weather</h3>
        <p className="text-red-600">Unable to load weather data</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Cloud className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
      <h3 className="text-lg font-semibold mb-2">Copenhagen Weather</h3>
      <div className="flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">
          {weather.temperature}°C
        </span>
        <span className="ml-2 text-gray-600 capitalize">
          {weather.description}
        </span>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="mx-auto mt-2"
        width="50"
        height="50"
      />
    </div>
  );
}