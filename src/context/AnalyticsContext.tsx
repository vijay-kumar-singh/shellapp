import React, { createContext, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

type AnalyticsContextType = {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  trackPageView: (path: string) => void;
};

export const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    // In a real application, you would send this to your analytics service
    console.log('Analytics Event:', { eventName, properties });
  }, []);

  const trackPageView = useCallback((path: string) => {
    // In a real application, you would send this to your analytics service
    console.log('Page View:', { path });
  }, []);

  React.useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
}