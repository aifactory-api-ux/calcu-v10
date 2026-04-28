import { useEffect } from 'react';
import Calculator from './components/Calculator';
import Display from './components/Display';
import History from './components/History';
import { useCalculator } from './hooks/useCalculator';
import './styles/main.css';

function App() {
  const {
    input,
    setInput,
    result,
    loading,
    error,
    history,
    calculate,
    fetchHistory,
  } = useCalculator();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calcu v10</h1>
      </header>
      <main className="app-main">
        <div className="calculator-section">
          <Display value={result !== null ? result : input} />
          <Calculator
            input={input}
            setInput={setInput}
            calculate={calculate}
            loading={loading}
            error={error}
          />
        </div>
        <aside className="history-section">
          <History history={history} />
        </aside>
      </main>
    </div>
  );
}

export default App;