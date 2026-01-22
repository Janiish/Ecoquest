import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../server';

describe('Basic API Tests', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('message');
  });

  it('should return version info', async () => {
    const res = await request(app).get('/api/version');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'EcoQuest Backend');
    expect(res.body).toHaveProperty('version', '1.0.0');
  });

  it('should return 401 without auth token on protected route', async () => {
    const res = await request(app).post('/api/quests').send({
      title: 'Test',
      description: 'Test',
      xp: 50,
      category: 'test',
      difficulty: 'easy',
    });
    expect(res.status).toBe(401);
  });
});
