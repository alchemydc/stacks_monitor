import React from 'react';
import { Link } from 'react-router-dom';
import PoxDataDisplay from './PoxDataDisplay';
import type { PoxResponse } from '../types';

interface LandingPageProps {
  poxData: PoxResponse | null;
  loading: boolean;
  error: Error | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ poxData, loading, error }) => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto dark:shadow-indigo-500/20">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
        Monitor Your Stacks Network Performance
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
        Real-time monitoring and alerts for Stacks blockchain signers. Track performance metrics, 
        ensure optimal staking, and never miss important network events.
      </p>
      <div className="mb-8">
        <Link 
          to="/signer-metrics" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors duration-200 font-medium"
        >
          View Signer Metrics
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
          <p className="text-gray-600 dark:text-gray-400">Know when you're about to get priced out of the active set.</p>
        </div>
      </div>
      </section>
      <div className="mt-8">
        <PoxDataDisplay poxData={poxData} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default LandingPage;
