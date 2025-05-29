const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET /api/habits', () => {
  test('200: Responds with an array of habit objects', () => {
    return request(app)
      .get('/api/habits')
      .expect(200)
      .then(({ body: { habits } }) => {
        expect(habits.length).not.toBe(0);
        habits.forEach((habit) => {
          expect(habit).toEqual(
            expect.objectContaining({
              habit_id: expect.any(Number),
              username: expect.any(String),
              name: expect.any(String),
              frequency: expect.any(String),
              streak_count: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
});

describe('GET /api/habits/:habit_id', () => {
  test('200: Responds with a habit object', () => {
    return request(app)
      .get('/api/habits/1')
      .expect(200)
      .then(({ body: { habit } }) => {
        expect(habit).toEqual({
          habit_id: 1,
          username: 'testuser1',
          name: 'Morning Yoga',
          frequency: 'Daily',
          streak_count: 5,
          created_at: '2025-11-20T00:00:00.000Z',
        });
      });
  });
  test('400: Responds with "bad request" when passed an invalid habit_id', () => {
    return request(app)
      .get('/api/habits/banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
});
