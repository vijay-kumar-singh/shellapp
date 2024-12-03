import React, { useCallback } from 'react';
import { useScriptLoader } from '../hooks/useScriptLoader';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';

declare global {
  interface Window {
    HelloWorld?: typeof HTMLElement;
    HelloContent?: typeof HTMLElement;
  }
}

export function Stats() {
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Load hello-world.js
  const { isLoaded: isHelloWorldLoaded, error: helloWorldError } = useScriptLoader(
    'https://tangerine-conkies-51282e.netlify.app/hello-world.js', 
    { onError: (error) => console.error('Widget error:', error) }
  );

  // Load hello-content.js
  const { isLoaded: isHelloContentLoaded, error: helloContentError } = useScriptLoader(
    'https://tangerine-conkies-51282e.netlify.app/hello-contant.js', 
    { onError: (error) => console.error('Widget error:', error) }
  );

  // If either widget fails to load, show an error
  if (helloWorldError || helloContentError) {
    return (
      <ErrorDisplay
        title="Widget Load Error"
        message={helloWorldError || helloContentError || 'Unknown error'}
        onRetry={handleRetry}
      />
    );
  }

  // If any of the widgets is not loaded, show loading spinner
  if (!isHelloWorldLoaded || !isHelloContentLoaded) {
    return <LoadingSpinner />;
  }

  // Render the widgets only if both are loaded
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <hello-world></hello-world>
      <hello-contant></hello-contant>
    </div>
  );
}
