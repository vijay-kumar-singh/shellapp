import React from 'react';
import { BarChart } from 'lucide-react';

export function StatsWidget() {
  return (
    <div className="text-center">
      <BarChart className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
      <h3 className="text-lg font-semibold mb-2">Statistics</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Visitors</span>
          <span className="font-semibold">1,234</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Page Views</span>
          <span className="font-semibold">5,678</span>
        </div>
      </div>
    </div>
  );
}