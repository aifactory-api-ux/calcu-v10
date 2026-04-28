import { evaluateExpression } from '../src/utils/evaluate';

describe('evaluateExpression', () => {
  describe('valid expressions', () => {
    it('should add two positive numbers', () => {
      expect(evaluateExpression('2+3')).toBe(5);
    });

    it('should subtract two numbers', () => {
      expect(evaluateExpression('10-4')).toBe(6);
    });

    it('should handle multiple operations', () => {
      expect(evaluateExpression('5+3-2')).toBe(6);
    });

    it('should handle negative numbers in expression', () => {
      expect(evaluateExpression('-5+3')).toBe(-2);
    });

    it('should handle decimal numbers', () => {
      expect(evaluateExpression('2.5+1.5')).toBe(4);
    });

    it('should handle whitespace in expression', () => {
      expect(evaluateExpression('2 + 3')).toBe(5);
    });

    it('should throw for empty string', () => {
      expect(() => evaluateExpression('')).toThrow('Invalid expression');
    });
  });

  describe('invalid expressions', () => {
    it('should throw for invalid characters', () => {
      expect(() => evaluateExpression('2*a')).toThrow('Invalid expression');
    });

    it('should throw for multiplication', () => {
      expect(() => evaluateExpression('2*3')).toThrow('Invalid expression');
    });

    it('should throw for division', () => {
      expect(() => evaluateExpression('6/2')).toThrow('Invalid expression');
    });

    it('should handle ++ as valid (produces 0)', () => {
      expect(evaluateExpression('++')).toBe(0);
    });
  });
});