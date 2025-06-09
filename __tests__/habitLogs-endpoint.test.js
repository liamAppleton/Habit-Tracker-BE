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
            })
          );
        });
      });
  });
});

describe('GET /api/habit-logs/:habit_id', () => {
  test('200: Responds with an array of habitLogs for a given habit_id', () => {
    return request(app)
      .get('/api/habit-logs/1')
      .expect(200)
      .then(({ body: { habitLogs } }) => {
        habitLogs.forEach((habitLog) => {
          expect(habitLog).toEqual(
            expect.objectContaining({
              log_id: expect.any(Number),
              habit_id: 1,
              date: expect.any(String),
            })
          );
        });
      });
  });
  test('400: Responds with "bad request" when passed an invalid habit_id', () => {
    return request(app)
      .get('/api/habit-logs/banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
  test('400: Responds with "habit not found" when passed a habit_id that does not exist', () => {
    return request(app)
      .get('/api/habit-logs/99999')
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('habit not found');
      });
  });
});

describe('POST /api/habit-logs/:habit_id', () => {
  test('200: Responds with the posted habit log', () => {
    return request(app)
      .post('/api/habit-logs/1')
      .send({})
      .expect(200)
      .then(({ body: { habitLog } }) => {
        expect(habitLog).toEqual(
          expect.objectContaining({
            log_id: expect.any(Number),
            habit_id: 1,
            date: expect.any(String),
          })
        );
      });
  });
  test('400: Responds with "bad request" when passed an invalid habit_id', () => {
    return request(app)
      .post('/api/habit-logs/banana')
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
  test('400: Responds with "habit not found" when passed a habit_id that does not exist', () => {
    return request(app)
      .post('/api/habit-logs/99999')
      .send({})
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('habit not found');
      });
  });
});

describe('DELETE /api/habit-logs/:habit_id/:log_id', () => {
  test('204: Responds with 204 status code', () => {
    return request(app).delete('/api/habit-logs/1/1').expect(204);
  });
  test('400: Responds with "bad request" when passed an invalid habit_id', () => {
    return request(app)
      .delete('/api/habit-logs/banana/1')
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
});
