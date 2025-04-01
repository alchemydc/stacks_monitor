import React from 'react';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Stacks Monitor</h1>
      <nav className="bg-gray-100 p-4 rounded-md shadow-md">
        <ul className="flex space-x-4">
          <li>
            <Link href="/pox-info" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">POX Info</Link>
          </li>
          <li>
            <Link href="/signers" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signers</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
