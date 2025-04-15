import React, { useState, useEffect } from 'react';
import { fetchSigners } from '../services/StacksAPIService';
import SignerDetails from './SignerDetails';

const SignerSelector = () => {
  const [signers, setSigners] = useState<string[]>([]);
  const [selectedSigner, setSelectedSigner] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSigners = async () => {
      const signersData = await fetchSigners();
      if (signersData) {
        setSigners(signersData);
      }
      setIsLoading(false);
    };

    getSigners();
  }, []);

  const handleSignerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSigner(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Signers</h2>
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Select Signers
      </h2>
      <ul className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
        {signers.map((signer) => (
          <li key={signer} className="py-3 first:pt-0 last:pb-0">
            <label className="flex items-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-150">
              <input
                type="radio"
                name="signer"
                value={signer}
                checked={selectedSigner === signer}
                onChange={handleSignerChange}
                className="w-4 h-4 text-indigo-600 dark:text-indigo-400 
                         border-gray-300 dark:border-gray-600 
                         rounded focus:ring-2 focus:ring-indigo-500 
                         dark:focus:ring-indigo-400 
                         focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              />
              <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 
                           group-hover:text-gray-900 dark:group-hover:text-white">
                {signer}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <SignerDetails signer={selectedSigner} />
    </div>
  );
};

export default SignerSelector;
