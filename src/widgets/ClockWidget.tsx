import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <ClockIcon className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
      <h3 className="text-lg font-semibold mb-2">Current Time</h3>
      <p className="text-2xl font-bold text-gray-900">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}