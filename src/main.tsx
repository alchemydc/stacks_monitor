import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PoxDataDisplay from './components/PoxDataDisplay';
import { fetchPoxData } from './services/StacksAPIService';
import StyledLink from './components/StyledLink';
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
      <Routes>
        <Route path="/" element={
          <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
            <div>
              <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
                <svg className="h-6 w-6 stroke-white" >
                </svg>
              </span>
            </div>
            <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Stacks Monitoring Tools</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
              Lorem Ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
            </p>
            {poxData && <StyledLink to="/poxdata">View POX Data</StyledLink>}
          </div>
        } />
        <Route path="/poxdata" element={<PoxDataDisplay poxData={poxData} />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
