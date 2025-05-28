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
