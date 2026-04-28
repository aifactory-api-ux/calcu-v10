import request from 'supertest';
import app from '../src/app';

const mockQuery = jest.fn();
jest.mock('../src/db', () => ({
  __esModule: true,
  default: { query: (...args: any[]) => mockQuery(...args) },
}));

describe('API Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok', service: 'backend', version: '1.0.0' });
    });
  });

  describe('POST /api/calculate', () => {
    it('should return 400 when expression is missing', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({});
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Expression is required' });
    });

    it('should return 400 when expression is not a string', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: 123 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Expression is required' });
    });

    it('should calculate valid expression', async () => {
      const mockInsertResult = {
        rows: [{
          id: 1,
          expression: '2+3',
          result: 5,
          created_at: new Date('2024-01-01'),
        }],
      };
      mockQuery.mockResolvedValueOnce(mockInsertResult);

      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '2+3' });
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.expression).toBe('2+3');
      expect(response.body.result).toBe(5);
    });

    it('should return 400 for invalid expression', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ expression: '2*a' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid expression');
    });
  });

  describe('GET /api/history', () => {
    it('should return history of calculations', async () => {
      const mockRows = [
        { id: 1, expression: '2+3', result: 5, created_at: new Date('2024-01-01') },
        { id: 2, expression: '10-4', result: 6, created_at: new Date('2024-01-02') },
      ];
      mockQuery.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/history');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].id).toBe(1);
      expect(response.body[1].id).toBe(2);
    });

    it('should return empty array when no history', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/api/history');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return 500 on database error', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).get('/api/history');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Database error' });
    });
  });
});