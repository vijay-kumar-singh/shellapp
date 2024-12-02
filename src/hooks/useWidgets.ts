import { useState, useEffect } from 'react';
import { ClockWidget } from '../widgets/ClockWidget';
import { WeatherWidget } from '../widgets/WeatherWidget';
import { StatsWidget } from '../widgets/StatsWidget';

export function useWidgets() {
  const [widgets, setWidgets] = useState<React.ComponentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading widgets dynamically
    const loadWidgets = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWidgets([ClockWidget, WeatherWidget, StatsWidget]);
      setLoading(false);
    };

    loadWidgets();
  }, []);

  return { widgets, loading };
}