const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET /api/users', () => {
  test('200: Responds with an array of user objects', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).not.toBe(0);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.anything(),
            })
          );
        });
      });
  });
});

describe('GET /api/users/:username', () => {
  test('200: Responds with a user object', () => {
    return request(app)
      .get('/api/users/testuser1')
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          username: 'testuser1',
          email: 'testuser1@example.com',
          password: 'hashedpassword123',
          created_at: '2025-11-23T00:00:00.000Z',
          updated_at: '2025-11-23T00:00:00.000Z',
        });
      });
  });
});
