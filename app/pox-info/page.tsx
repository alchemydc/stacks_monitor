import React from 'react';
import PoxDataDisplay from "../../src/components/PoxDataDisplay";
import { fetchPoxData } from "../../src/services/StacksAPIService";

export default async function PoxInfoPage() {
  const poxData = await fetchPoxData();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">POX Info</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        <PoxDataDisplay poxData={poxData} />
      </div>
    </div>
  );
}
