import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../src/components/Calculator';

describe('Calculator Component', () => {
  const defaultProps = {
    input: '',
    setInput: () => {},
    calculate: () => {},
    loading: false,
    error: null,
  };

  it('should render input field', () => {
    render(<Calculator {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter expression');
    expect(input).toBeTruthy();
  });

  it('should render calculator buttons', () => {
    render(<Calculator {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(15);
  });

  it('should display error message when error prop is set', () => {
    render(<Calculator {...defaultProps} error="Invalid expression" />);
    const errorDiv = screen.getByText('Invalid expression');
    expect(errorDiv).toBeTruthy();
  });

  it('should call setInput when typing in input', () => {
    const setInput = vi.fn();
    render(<Calculator {...defaultProps} setInput={setInput} />);
    const input = screen.getByPlaceholderText('Enter expression');
    fireEvent.change(input, { target: { value: '2+3' } });
    expect(setInput).toHaveBeenCalledWith('2+3');
  });

  it('should call calculate when Enter key is pressed', () => {
    const calculate = vi.fn();
    render(<Calculator {...defaultProps} calculate={calculate} />);
    const input = screen.getByPlaceholderText('Enter expression');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(calculate).toHaveBeenCalled();
  });

  it('should disable input when loading', () => {
    render(<Calculator {...defaultProps} loading={true} />);
    const input = screen.getByPlaceholderText('Enter expression') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should disable all buttons when loading', () => {
    render(<Calculator {...defaultProps} loading={true} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(btn => {
      expect(btn.hasAttribute('disabled')).toBe(true);
    });
  });
});