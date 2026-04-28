import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../src/hooks/useCalculator';

global.fetch = vi.fn();

describe('useCalculator Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.input).toBe('');
    expect(result.current.result).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.history).toEqual([]);
  });

  it('should set error when calculating empty expression', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setInput('');
    });
    act(() => {
      result.current.calculate();
    });
    expect(result.current.error).toBe('Expression is required');
  });

  it('should update input when setInput is called', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setInput('2+3');
    });
    expect(result.current.input).toBe('2+3');
  });

  it('should clear state when clear is called', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setInput('2+3');
    });
    act(() => {
      result.current.clear();
    });
    expect(result.current.input).toBe('');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle successful calculation', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ id: 1, expression: '2+3', result: 5, created_at: '2024-01-01' }),
    };
    const mockHistoryResponse = {
      ok: true,
      json: () => Promise.resolve([{ id: 1, expression: '2+3', result: 5, created_at: '2024-01-01' }]),
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse).mockResolvedValueOnce(mockHistoryResponse);

    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setInput('2+3');
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.result).toBe(5);
  });

  it('should handle calculation error', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Invalid expression' }),
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.setInput('2*a');
    });
    await act(async () => {
      await result.current.calculate();
    });
    expect(result.current.error).toBe('Invalid expression');
  });

  it('should fetch history successfully', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve([{ id: 1, expression: '2+3', result: 5 }]),
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCalculator());
    await act(async () => {
      await result.current.fetchHistory();
    });
    expect(result.current.history).toHaveLength(1);
  });
});