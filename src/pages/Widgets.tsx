import React, { useEffect } from 'react';
import { useWidgets } from '../hooks/useWidgets';
import { useAnalytics } from '../hooks/useAnalytics';

export function Widgets() {
  const { widgets, loading } = useWidgets();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!loading && widgets.length > 0) {
      trackEvent('widgets_loaded', { count: widgets.length });
    }
  }, [loading, widgets.length, trackEvent]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((Widget, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <Widget />
        </div>
      ))}
    </div>
  );
}