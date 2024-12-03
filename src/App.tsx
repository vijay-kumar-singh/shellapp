import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AnalyticsProvider } from './context/AnalyticsContext';

// Lazy-loaded components
const Home = lazy(() =>
  import('./pages/Home').then((module) => ({ default: module.Home }))
);
const Widgets = lazy(() =>
  import('./pages/Widgets').then((module) => ({ default: module.Widgets }))
);
const Stats = lazy(() =>
  import('./pages/Stats').then((module) => ({ default: module.Stats }))
);

// Fallback component
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        {/* Use Suspense to handle lazy loading */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="widgets" element={<Widgets />} />
              <Route path="stats" element={<Stats />} />
            </Route>
          </Routes>
        </Suspense>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}

export default App;
