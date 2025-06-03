const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET /api/habit-logs', () => {
  test('200: Responds with an array of habitLog objects', () => {
    return request(app)
      .get('/api/habit-logs')
      .expect(200)
      .then(({ body: { habitLogs } }) => {
        expect(habitLogs.length).not.toBe(0);
        habitLogs.forEach((habitLog) => {
          expect(habitLog).toEqual(
            expect.objectContaining({
              log_id: expect.any(Number),
              habit_id: expect.any(Number),
              date: expect.any(String),
              status: expect.any(String),
            })
          );
        });
      });
  });
});
