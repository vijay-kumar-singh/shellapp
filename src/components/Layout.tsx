import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout as LayoutIcon, LayoutGrid, Home, BarChart } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LayoutIcon className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold">Widget Dashboard</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <Link
                  to="/widgets"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Widgets
                </Link>
                <Link
                  to="/stats"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <BarChart className="h-4 w-4 mr-1" />
                  Stats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}