CREATE TABLE IF NOT EXISTS calculations (
  id SERIAL PRIMARY KEY,
  expression VARCHAR(255) NOT NULL,
  result NUMERIC(20, 10) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations (created_at DESC);
