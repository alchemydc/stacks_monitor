import { useState, useEffect } from 'react';
import { fetchPoxData } from '../services/StacksAPIService';
import type { PoxResponse } from '../types';

export function usePoxData(enabled: boolean = true) {
  const [poxData, setPoxData] = useState<PoxResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!enabled) return;

      setLoading(true);
      try {
        const data = await fetchPoxData();
        setPoxData(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to fetch POX data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [enabled]);

  return { poxData, loading, error };
}
