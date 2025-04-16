import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSignerMetrics, Signer } from '../services/StacksAPIService';

// Constants for thresholds
const STX_THRESHOLD = 160000;
const LATENCY_THRESHOLD = 5000;
const PARTICIPATION_THRESHOLD = 95;

// Helper function to format numbers with commas
const formatNumber = (num: number | string): string => {
  return Number(num).toLocaleString();
};

// Helper function to calculate block participation rate
const calculateParticipationRate = (accepted: number, total: number): number => {
  if (total === 0) return 0;
  return (accepted / total) * 100;
};

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  status?: 'success' | 'warning' | 'error';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'bg-green-100 dark:bg-green-900';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900';
      case 'error': return 'bg-red-100 dark:bg-red-900';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className={`rounded-lg p-4 ${getStatusColor()}`}>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      {subValue && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subValue}</p>
      )}
    </div>
  );
};

const SignerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { signerKey } = useParams<{ signerKey: string }>();
  const [signerDetails, setSignerDetails] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSignerDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      if (!signerKey) {
        setIsLoading(false);
        return;
      }

      try {
        const signerData = await fetchSignerMetrics(signerKey);
        if (signerData) {
          setSignerDetails(signerData);
        } else {
          setError("No data available for this signer");
        }
      } catch (err) {
        console.error("Error fetching signer details:", err);
        setError("Failed to fetch signer details. Please try again later.");
        setSignerDetails(null);
      }
      
      setIsLoading(false);
    };

    getSignerDetails();
  }, [signerKey]);

  const renderErrorState = () => (
    <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 dark:border-red-600 p-4 rounded">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400 dark:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Signer Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
        <div className="space-y-6">
          {/* Signer Info Skeleton */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>

          {/* Performance Metrics Skeleton */}
          <div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg p-4 bg-gray-100 dark:bg-gray-700">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Stats Skeleton */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Signer Details</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
            aria-label="Close"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {error ? renderErrorState() : signerDetails ? (
        <div className="space-y-6">
          {/* Signer Identification */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Signer Information</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Key: {signerDetails.signer_key}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Version: {signerDetails.version}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Seen: {new Date(signerDetails.last_seen).toLocaleString()}</p>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Block Participation */}
              <MetricCard
                title="Block Participation Rate"
                value={`${calculateParticipationRate(
                  signerDetails.proposals_accepted_count,
                  signerDetails.proposals_accepted_count + 
                  signerDetails.proposals_rejected_count + 
                  signerDetails.proposals_missed_count
                ).toFixed(1)}%`}
                subValue={`${formatNumber(signerDetails.proposals_accepted_count)} blocks accepted`}
                status={calculateParticipationRate(
                  signerDetails.proposals_accepted_count,
                  signerDetails.proposals_accepted_count + 
                  signerDetails.proposals_rejected_count + 
                  signerDetails.proposals_missed_count
                ) >= PARTICIPATION_THRESHOLD ? 'success' : 'error'}
              />

              {/* Response Time */}
              <MetricCard
                title="Average Response Time"
                value={signerDetails.average_response_time_ms === 0 
                  ? "DOWN" 
                  : `${signerDetails.average_response_time_ms.toFixed(1)} ms`}
                subValue={signerDetails.average_response_time_ms === 0 
                  ? "Signer is not responding" 
                  : "Network latency"}
                status={signerDetails.average_response_time_ms === 0 
                  ? 'error'
                  : signerDetails.average_response_time_ms < LATENCY_THRESHOLD 
                  ? 'success' 
                  : 'warning'}
              />

              {/* Stacked Amount */}
              <MetricCard
                title="Stacked STX"
                value={formatNumber(signerDetails.stacked_amount)}
                subValue={`Rank: #${signerDetails.stacked_amount_rank}`}
                status={Number(signerDetails.stacked_amount) >= STX_THRESHOLD ? 'success' : 'error'}
              />
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Detailed Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Block Statistics</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-green-600 dark:text-green-400">{signerDetails.proposals_accepted_count}</span> Accepted
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-red-600 dark:text-red-400">{signerDetails.proposals_rejected_count}</span> Rejected
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-yellow-600 dark:text-yellow-400">{signerDetails.proposals_missed_count}</span> Missed
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Weight Details</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Weight: {signerDetails.weight}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Percentage: {signerDetails.weight_percentage.toFixed(2)}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Slot Index: {signerDetails.slot_index}</p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Staking Details</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Amount %: {signerDetails.stacked_amount_percent.toFixed(2)}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Global Rank: #{signerDetails.stacked_amount_rank}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No signer selected</p>
      )}
    </div>
  );
};

export default SignerDetails;
