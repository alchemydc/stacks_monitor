import { fetchPoxData } from "../services/StacksAPIService";

interface PoxDataDisplayProps {
  poxData: any;
}

function PoxDataDisplay({ poxData }: PoxDataDisplayProps) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">Stacks POX Data</h2>
      <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
        {JSON.stringify(poxData, null, 2)}
      </pre>
    </div>
  );
}

export default PoxDataDisplay;
