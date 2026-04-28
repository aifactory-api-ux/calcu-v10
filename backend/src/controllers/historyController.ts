import { Request, Response } from 'express';
import { Calculation } from '../models/Calculation';
import pool from '../db';

export async function historyHandler(_req: Request, res: Response): Promise<void> {
  try {
    const result = await pool.query<Calculation>(
      'SELECT id, expression, result, created_at FROM calculations ORDER BY created_at DESC'
    );

    const calculations: Calculation[] = result.rows.map(row => ({
      ...row,
      created_at: new Date(row.created_at).toISOString(),
    }));

    res.status(200).json(calculations);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: message });
  }
}