import { Calculation } from '../types/calculation';

interface HistoryProps {
  history: Calculation[];
}

function History({ history }: HistoryProps) {
  return (
    <div className="history">
      <h3>History</h3>
      <ul className="history-list">
        {history.map((calc) => (
          <li key={calc.id} className="history-item">
            <span className="history-expression">{calc.expression}</span>
            <span className="history-result">= {calc.result}</span>
            <span className="history-time">
              {new Date(calc.created_at).toLocaleTimeString()}
            </span>
          </li>
        ))}
        {history.length === 0 && (
          <li className="history-empty">No calculations yet</li>
        )}
      </ul>
    </div>
  );
}

export default History;