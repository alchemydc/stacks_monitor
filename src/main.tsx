import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PoxDataDisplay from './components/PoxDataDisplay';
import { fetchPoxData } from './services/StacksAPIService';
import SignerSelector from './components/SignerSelector';
import SignerMetricsTable from './components/SignerMetricsTable';
import SignerDetails from './components/SignerDetails';
import { debug } from './utils/debug';
import './styles.css';


interface PoxResponse {
  contract_id: string;
  pox_activation_threshold_ustx: number;
  first_burnchain_block_height: number;
  current_burnchain_block_height: number;
  prepare_phase_block_length: number;
  reward_phase_block_length: number;
  reward_slots: number;
  rejection_fraction: null | number;
  total_liquid_supply_ustx: number;
  current_cycle: {
    id: number;
    min_threshold_ustx: number;
    stacked_ustx: number;
    is_pox_active: boolean;
  };
  next_cycle: {
    id: number;
    min_threshold_ustx: number;
    min_increment_ustx: number;
    stacked_ustx: number;
    prepare_phase_start_block_height: number;
    blocks_until_prepare_phase: number;
    reward_phase_start_block_height: number;
    blocks_until_reward_phase: number;
    ustx_until_pox_rejection: null | number;
  };
  epochs: any[];
  min_amount_ustx: number;
  prepare_cycle_length: number;
  reward_cycle_id: number;
  reward_cycle_length: number;
  rejection_votes_left_required: null | number;
  next_reward_cycle_in: number;
  contract_versions: any[];
}

function App() {
  const [poxData, setPoxData] = useState<PoxResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPoxData();
        if (data) {
          setPoxData(data as PoxResponse);
        } else {
          console.warn("fetchPoxData returned null or undefined");
        }
      } catch (error) {
        console.error("Error fetching POX data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <header className="bg-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Stacks Monitoring Tools</h1>
          <nav className="flex space-x-4">
            <Link to="/poxdata" className="hover:underline transition-all duration-200">POX Data</Link>
            <Link to="/signers" className="hover:underline transition-all duration-200">Signers</Link>
            <Link to="/metrics" className="hover:underline transition-all duration-200">Metrics</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Monitor Your Stacks Network Performance
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Real-time monitoring and alerts for Stacks blockchain signers. Track performance metrics, 
            ensure optimal staking, and never miss important network events.
          </p>
          <div className="flex gap-4 mb-8">
            <Link 
              to="/signers" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Start Monitoring
            </Link>
            <Link 
              to="/poxdata" 
              className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200 font-medium"
            >
              View POX Data
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Metrics</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor signer performance with up-to-the-minute data.</p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Alerts</h3>
              <p className="text-gray-600 dark:text-gray-400">Set personalized thresholds for important network events.</p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">POX Cycle Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Stay informed about upcoming POX cycle changes.</p>
            </div>
          </div>
        </section>
        <Routes>
          <Route path="/poxdata" element={<PoxDataDisplay poxData={poxData} />} />
          <Route path="/signers" element={<SignerSelector />} />
          <Route path="/metrics" element={<SignerMetricsTable currentCycle={poxData?.current_cycle.id || 0} />} />
          <Route path="/signer/:signerKey" element={<SignerDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
