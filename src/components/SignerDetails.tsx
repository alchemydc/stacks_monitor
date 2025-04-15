import React, { useState, useEffect } from 'react';
import { fetchSignerMetrics, Signer } from '../services/StacksAPIService';

interface SignerDetailsProps {
  signer: string | null;
}

const SignerDetails: React.FC<SignerDetailsProps> = ({ signer }) => {
  const [signerDetails, setSignerDetails] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSignerDetails = async () => {
      if (signer) {
        const signerData = await fetchSignerMetrics(signer);
        if (signerData) {
          setSignerDetails(signerData);
        }
      }
      setIsLoading(false);
    };

    getSignerDetails();
  }, [signer]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Signer Details</h2>
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Signer Details</h2>
      {signerDetails ? (
        <>
          <p className="text-gray-500 dark:text-gray-400">Signer Key: {signerDetails.signer_key}</p>
          <p className="text-gray-500 dark:text-gray-400">Slot Index: {signerDetails.slot_index}</p>
           <p className="text-gray-500 dark:text-gray-400">Weight: {signerDetails.weight}</p>
          <p className="text-gray-500 dark:text-gray-400">Weight Percentage: {signerDetails.weight_percentage}</p>
          <p className="text-gray-500 dark:text-gray-400">Stacked Amount: {signerDetails.stacked_amount}</p>
          <p className="text-gray-500 dark:text-gray-400">Stacked Amount Percent: {signerDetails.stacked_amount_percent}</p>
          <p className="text-gray-500 dark:text-gray-400">Stacked Amount Rank: {signerDetails.stacked_amount_rank}</p>
          <p className="text-gray-500 dark:text-gray-400">Proposals Accepted Count: {signerDetails.proposals_accepted_count}</p>
          <p className="text-gray-500 dark:text-gray-400">Proposals Rejected Count: {signerDetails.proposals_rejected_count}</p>
          <p className="text-gray-500 dark:text-gray-400">Proposals Missed Count: {signerDetails.proposals_missed_count}</p>
          <p className="text-gray-500 dark:text-gray-400">Average Response Time: {signerDetails.average_response_time_ms}</p>
          <p className="text-gray-500 dark:text-gray-400">Last Seen: {signerDetails.last_seen}</p>
          <p className="text-gray-500 dark:text-gray-400">Version: {signerDetails.version}</p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No signer selected</p>
      )}
    </div>
  );
};

export default SignerDetails;
