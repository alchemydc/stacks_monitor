import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSignersForCycle } from '../services/StacksAPIService';
import type { CycleSigner } from '../services/StacksAPIService';

interface SignerMetricsTableProps {
  currentCycle: number;
}

type SortCriteria = 'stackedAmount' | 'responseTime';
type SortOrder = 'asc' | 'desc';

const SignerMetricsTable: React.FC<SignerMetricsTableProps> = ({ currentCycle }) => {
  const [metrics, setMetrics] = useState<CycleSigner | null>(null);
  const [selectedCycle, setSelectedCycle] = useState(currentCycle);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('responseTime');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (criteria: SortCriteria) => {
    if (sortCriteria === criteria) {
      // Toggle sort order if clicking the same criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new criteria and default to descending order
      setSortCriteria(criteria);
      setSortOrder('desc');
    }
  };

  const getSortedResults = () => {
    if (!metrics?.results) return [];
    
    return [...metrics.results].sort((a, b) => {
      if (sortCriteria === 'stackedAmount') {
        const aValue = parseInt(a.stacked_amount);
        const bValue = parseInt(b.stacked_amount);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const aValue = a.average_response_time_ms;
        const bValue = b.average_response_time_ms;
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
  };

  const getSortIndicator = (criteria: SortCriteria) => {
    if (sortCriteria !== criteria) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await fetchSignersForCycle(selectedCycle);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError("Failed to load signer metrics.");
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, [selectedCycle]);

  const handleCycleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCycle(Number(event.target.value));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 rounded-lg bg-red-50">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Signer Metrics for Cycle {selectedCycle}
        </h2>
        <select
          value={selectedCycle}
          onChange={handleCycleChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={currentCycle - i}>
              Cycle {currentCycle - i}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Signer Key
              </th>
              <th 
                className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
                onClick={() => handleSort('stackedAmount')}
              >
                Stacked Amount ↕️
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Performance
              </th>
              <th 
                className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
                onClick={() => handleSort('responseTime')}
              >
                Status ↕️ {getSortIndicator('responseTime')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {getSortedResults().map((signer) => (
              <tr key={signer.signer_key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <Link 
                    to={`/signer/${signer.signer_key}`}
                    className="text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    {signer.signer_key.substring(0, 8)}...
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {parseInt(signer.stacked_amount).toLocaleString()} STX
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <div>
                    Accepted: {signer.proposals_accepted_count}
                    <br />
                    Rejected: {signer.proposals_rejected_count}
                    <br />
                    Missed: {signer.proposals_missed_count}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      signer.average_response_time_ms === 0 ? 'bg-red-500' :
                      signer.average_response_time_ms < 10000 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    {signer.average_response_time_ms}ms
                    {signer.average_response_time_ms === 0 && (
                      <span className="ml-2 text-red-600 dark:text-red-400 font-medium">DOWN</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignerMetricsTable;
