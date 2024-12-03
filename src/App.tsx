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
const Loading = () => (
  <div style={styles.loaderContainer}>
    <div style={styles.loaderText}>Loading...</div>
  </div>
);

const styles: { loaderContainer: React.CSSProperties; loaderText: React.CSSProperties } = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed', // Fixed position for full screen overlay
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Optional: Add a slight overlay
    zIndex: 9999, // Ensure it appears on top of other elements
  },
  loaderText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333', // Customize text color
  },
};

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
