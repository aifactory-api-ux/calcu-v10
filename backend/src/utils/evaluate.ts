export function evaluateExpression(expression: string): number {
  const cleaned = expression.replace(/\s/g, '');

  if (!/^[\d+\-.]+$/.test(cleaned)) {
    throw new Error('Invalid expression');
  }

  const tokens: string[] = [];
  let current = '';

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if ((char === '+' || char === '-') && current === '') {
      if (char === '-' && (tokens.length === 0 || tokens[tokens.length - 1] === '+' || tokens[tokens.length - 1] === '-')) {
        current += char;
        continue;
      }
    }
    if (char === '+' || char === '-') {
      if (current) {
        tokens.push(current);
        current = '';
      }
      tokens.push(char);
    } else {
      current += char;
    }
  }
  if (current) {
    tokens.push(current);
  }

  let result = 0;
  let currentOp = '+';

  for (const token of tokens) {
    if (token === '+' || token === '-') {
      currentOp = token;
    } else {
      const value = parseFloat(token);
      if (isNaN(value)) {
        throw new Error('Invalid number in expression');
      }
      if (currentOp === '+') {
        result += value;
      } else {
        result -= value;
      }
    }
  }

  return result;
}