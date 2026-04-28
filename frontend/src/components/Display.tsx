interface DisplayProps {
  value: string | number;
}

function Display({ value }: DisplayProps) {
  return (
    <div className="display">
      <span className="display-value">{value || '0'}</span>
    </div>
  );
}

export default Display;