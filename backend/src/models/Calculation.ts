export interface Calculation {
  id: number;
  expression: string;
  result: number;
  created_at: string;
}

export interface CalculationCreate {
  expression: string;
}