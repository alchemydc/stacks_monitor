import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import LandingPage from './components/LandingPage';
import PoxDataDisplay from './components/PoxDataDisplay';
import SignerMetricsTable from './components/SignerMetricsTable';
import SignerDetails from './components/SignerDetails';
import { debug } from './utils/debug';
import './styles.css';


import { usePoxData } from './utils/hooks';
import type { PoxResponse } from './types';

function AppContent() {
  const location = useLocation();
  const shouldFetchPox = ['/signer-metrics', '/signer'].some(path => 
    location.pathname.startsWith(path)
  ) || location.pathname === '/' || location.pathname === '/poxdata';
  
  const { poxData, loading, error } = usePoxData(shouldFetchPox);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage poxData={poxData} loading={loading} error={error} />} />
        <Route path="/poxdata" element={<PoxDataDisplay poxData={poxData} loading={loading} error={error} />} />
        <Route path="/signer-metrics" element={
          <SignerMetricsTable 
            currentCycle={poxData?.current_cycle.id || 0} 
            loading={loading} 
            error={error}
          />
        } />
        <Route path="/signer/:signerKey" element={<SignerDetails poxData={poxData} loading={loading} error={error} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="bg-indigo-600 text-white py-4 shadow-lg">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/" className="hover:text-indigo-100 transition-colors duration-200">
                Stacks Monitoring Tools
              </Link>
            </h1>
            <nav className="flex space-x-4">
              <Link to="/poxdata" className="hover:underline transition-all duration-200">POX Data</Link>
              <Link to="/signer-metrics" className="hover:underline transition-all duration-200">Signer Metrics</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <AppContent />
        </main>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
