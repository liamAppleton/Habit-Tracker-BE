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
          colour: '#FFFFFF',
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
  test('404: Responds with "habit not found" when passed a habit_id that does not exist', () => {
    return request(app)
      .get('/api/habits/99999')
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('habit not found');
      });
  });
});

describe('POST /api/habits', () => {
  let newHabit;
  beforeEach(() => {
    newHabit = {
      username: 'testuser1',
      name: 'Exercise',
      frequency: 'Daily',
      colour: '#FFFFFF',
    };
  });
  test('200: Responds with the posted habit', () => {
    return request(app)
      .post('/api/habits')
      .send(newHabit)
      .expect(200)
      .then(({ body: { habit } }) => {
        expect(habit).toEqual(
          expect.objectContaining({
            habit_id: expect.any(Number),
            username: 'testuser1',
            name: 'Exercise',
            frequency: 'Daily',
            streak_count: 0,
            created_at: expect.any(String),
            colour: '#FFFFFF',
          })
        );
      });
  });
  test('400: Responds with "bad request" when request body is missing fields', () => {
    delete newHabit.name;
    return request(app)
      .post('/api/habits')
      .send(newHabit)
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
  test('404: Responds with "user not found" when passed a username that does not exist', () => {
    newHabit.username = 'banana';
    return request(app)
      .post('/api/habits')
      .send(newHabit)
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('user not found');
      });
  });
});

describe('DELETE /api/habits/:habit_id', () => {
  test('204: Responds with 204 status code', () => {
    return request(app).delete('/api/habits/1').expect(204);
  });
  test('400: Responds with "bad request" when passed an invalid habit_id', () => {
    return request(app)
      .delete('/api/habits/banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
  test('404: Responds with "habit not found" when passed a habit_id that does not exist', () => {
    return request(app)
      .delete('/api/habits/99999')
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('habit not found');
      });
  });
});
