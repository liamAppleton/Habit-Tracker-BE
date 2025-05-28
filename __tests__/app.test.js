const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data');
const endPointsJson = require('../endpoints.json');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET /api', () => {
  test('200: Responds with an object dealing with the documentation for each endpoint', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body: { endPoints } }) => {
        expect(endPoints).toEqual(endPointsJson);
      });
  });
});

describe('Not a route', () => {
  test('404: Responds with "not a route"', () => {
    return request(app)
      .get('/banana')
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('not a route');
      });
  });
});
