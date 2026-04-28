interface CalculatorProps {
  input: string;
  setInput: (value: string) => void;
  calculate: () => void;
  loading: boolean;
  error: string | null;
}

function Calculator({ input, setInput, calculate, loading, error }: CalculatorProps) {
  const handleButtonClick = (value: string) => {
    if (value === '=') {
      calculate();
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const buttons = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '=',
    '0', '.', 'C'
  ];

  return (
    <div className="calculator">
      <div className="calculator-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              calculate();
            }
          }}
          placeholder="Enter expression"
          disabled={loading}
        />
      </div>
      {error && <div className="calculator-error">{error}</div>}
      <div className="calculator-buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === '=') {
                calculate();
              } else if (btn === 'C') {
                handleClear();
              } else {
                handleButtonClick(btn);
              }
            }}
            disabled={loading}
            className={`calculator-btn ${btn === '=' ? 'equals' : ''}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;