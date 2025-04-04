import React from 'react';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Stacks Monitor</h1>
      <nav className="bg-gray-100 p-4 rounded-md shadow-md">
        <ul className="flex space-x-4">
          <li>
            <a href="/pox-info" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">POX Info</a>
          </li>
          <li>
            <a href="/signers" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signers</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
