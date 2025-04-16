import React from 'react';
import type { PoxResponse } from '../types';

interface PoxDataDisplayProps {
  poxData: PoxResponse | null;
  loading: boolean;
  error: Error | null;
}

function PoxDataDisplay({ poxData, loading, error }: PoxDataDisplayProps) {
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Error Loading POX Data
          </h2>
          <p className="text-red-600 dark:text-red-400">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (loading || !poxData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Stacks POX Status
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Loading POX data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Stacks POX Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Cycle Card */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Current Cycle #{poxData.current_cycle.id}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Status:</span>
                <span className={`font-medium ${poxData.current_cycle.is_pox_active
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'}`}>
                  {poxData.current_cycle.is_pox_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Stacked STX:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {(poxData.current_cycle.stacked_ustx / 1000000).toLocaleString()} STX
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Min Threshold:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {(poxData.current_cycle.min_threshold_ustx / 1000000).toLocaleString()} STX
                </span>
              </div>
            </div>
          </div>

          {/* Next Cycle Card */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Next Cycle #{poxData.next_cycle.id}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Blocks until prepare:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {poxData.next_cycle.blocks_until_prepare_phase}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Blocks until reward:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {poxData.next_cycle.blocks_until_reward_phase}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Min Threshold:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {(poxData.next_cycle.min_threshold_ustx / 1000000).toLocaleString()} STX
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoxDataDisplay;
