import { useState, useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

interface ScriptLoaderOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useScriptLoader(
  scriptUrl: string,
  options: ScriptLoaderOptions = {}
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    let mounted = true;
    let scriptElement: HTMLScriptElement | null = null;

    const loadScript = async () => {
      try {
        // First try to fetch the script content
        const response = await fetch(scriptUrl, {
          mode: 'cors',
          credentials: 'omit'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch script');
        }

        const scriptContent = await response.text();

        // Create and inject the script
        scriptElement = document.createElement('script');
        scriptElement.type = 'module';
        scriptElement.text = scriptContent;

        const handleLoad = () => {
          if (mounted) {
            setIsLoaded(true);
            options.onSuccess?.();
            trackEvent('script_loaded', { success: true });
          }
        };

        const handleError = () => {
          if (mounted) {
            const errorMessage = 'Failed to execute the script';
            setError(errorMessage);
            options.onError?.(errorMessage);
            trackEvent('script_error', { error: 'execution_error' });
          }
        };

        scriptElement.addEventListener('load', handleLoad);
        scriptElement.addEventListener('error', handleError);

        document.head.appendChild(scriptElement);

        // Trigger load event since we're injecting content directly
        handleLoad();

        return () => {
          scriptElement?.removeEventListener('load', handleLoad);
          scriptElement?.removeEventListener('error', handleError);
        };
      } catch (err) {
        if (mounted) {
          const errorMessage = 'Failed to load the script';
          setError(errorMessage);
          options.onError?.(errorMessage);
          trackEvent('script_error', { error: 'loading_error' });
        }
      }
    };

    const cleanup = loadScript();

    return () => {
      mounted = false;
      if (typeof cleanup === 'function') {
        cleanup();
      }
      if (scriptElement && document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [scriptUrl, options, trackEvent]);

  return { isLoaded, error };
}