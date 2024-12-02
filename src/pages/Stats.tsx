import React, { useCallback } from 'react';
import { useScriptLoader } from '../hooks/useScriptLoader';
import { getWidgetScriptUrl } from '../services/statsWidgetService';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';

declare global {
  interface Window {
    HelloWorld?: typeof HTMLElement;
  }
}

export function Stats() {
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const { isLoaded, error } = useScriptLoader(getWidgetScriptUrl(), {
    onError: (error) => console.error('Widget error:', error)
  });

  if (error) {
    return (
      <ErrorDisplay
        title="Widget Load Error"
        message={error}
        onRetry={handleRetry}
      />
    );
  }

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <hello-world></hello-world>
    </div>
  );
}