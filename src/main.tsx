import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PoxDataDisplay from './components/PoxDataDisplay';
import { fetchPoxData } from './services/StacksAPIService';
import SignerSelector from './components/SignerSelector';
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
      <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Stacks Monitoring Tools</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
          Lorem Ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
        </p>
        <Link to="/poxdata" className="text-indigo-600 hover:text-indigo-800">View POX Data</Link>
        <br />
        <Link to="/signers" className="text-indigo-600 hover:text-indigo-800">View Signers</Link>
        <Routes>
          <Route path="/poxdata" element={<PoxDataDisplay poxData={poxData} />} />
          <Route path="/signers" element={<SignerSelector />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
