import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

export function Home() {
  const { trackEvent } = useAnalytics();

  const handleExploreClick = () => {
    trackEvent('explore_widgets_clicked');
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Widget Dashboard
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Explore our collection of dynamic widgets
      </p>
      <Link
        to="/widgets"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={handleExploreClick}
      >
        View Widgets
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
}