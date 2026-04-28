import { Request, Response } from 'express';
import { Calculation, CalculationCreate } from '../models/Calculation';
import pool from '../db';
import { evaluateExpression } from '../utils/evaluate';

export async function calculateHandler(req: Request, res: Response): Promise<void> {
  try {
    const body: CalculationCreate = req.body;

    if (!body.expression || typeof body.expression !== 'string') {
      res.status(400).json({ error: 'Expression is required' });
      return;
    }

    const result = evaluateExpression(body.expression);

    const insertResult = await pool.query<Calculation>(
      'INSERT INTO calculations (expression, result) VALUES ($1, $2) RETURNING id, expression, result, created_at',
      [body.expression, result]
    );

    const calculation = insertResult.rows[0];
    calculation.created_at = new Date(calculation.created_at).toISOString();

    res.status(200).json(calculation);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ error: message });
  }
}