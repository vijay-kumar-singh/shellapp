import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ title, message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}