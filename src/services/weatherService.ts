import { cacheService } from './cacheService';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free tier API key
const COPENHAGEN_COORDS = { lat: 55.6761, lon: 12.5683 };
const CACHE_KEY = 'weather_data';
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export async function fetchWeatherData() {
  try {
    // Check cache first
    const cachedData = cacheService.get(CACHE_KEY);
    if (cachedData) {
      return cachedData;
    }

    // If no cached data, fetch from API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${COPENHAGEN_COORDS.lat}&lon=${COPENHAGEN_COORDS.lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    
    // Cache the new data
    cacheService.set(CACHE_KEY, data, ONE_HOUR);
    
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}