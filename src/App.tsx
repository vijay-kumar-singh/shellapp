import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Widgets } from './pages/Widgets';
import { Stats } from './pages/Stats';
import { AnalyticsProvider } from './context/AnalyticsContext';

function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="widgets" element={<Widgets />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Routes>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}

export default App;