import { useState, useEffect } from 'react';

export function useHistory() {
  const [history, setHistory] = useState({ emails: [], messages: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch('/api/history');
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return { history, loading };
}