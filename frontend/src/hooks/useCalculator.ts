import { useState, useCallback } from 'react';
import { Calculation } from '../types/calculation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export function useCalculator() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Calculation[]>([]);

  const calculate = useCallback(async () => {
    if (!input.trim()) {
      setError('Expression is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: input }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Calculation failed');
      }

      const data: Calculation = await response.json();
      setResult(data.result);
      setInput('');
      await fetchHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [input]);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data: Calculation[] = await response.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  }, []);

  const clear = useCallback(() => {
    setInput('');
    setResult(null);
    setError(null);
  }, []);

  return {
    input,
    setInput,
    result,
    loading,
    error,
    history,
    calculate,
    clear,
    fetchHistory,
  };
}