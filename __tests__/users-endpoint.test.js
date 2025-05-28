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
        });
      });
  });
  test('404: Responds with "user not found" when passed a username that does not exist', () => {
    return request(app)
      .get('/api/users/banana')
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('user not found');
      });
  });
});

describe('POST /api/users', () => {
  let newUser;

  beforeEach(() => {
    newUser = {
      username: 'superNaga',
      email: 'superNaga@example.com',
      password: 'password123',
    };
  });

  test('201: Responds with the posted user', () => {
    return request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            username: 'superNaga',
            email: 'superNaga@example.com',
            password: 'password123',
            created_at: expect.any(String),
          })
        );
      });
  });
  test('400: Responds with "bad request" when request body is missing fields', () => {
    delete newUser.username;
    return request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
});

describe('PATCH /api/users/:username', () => {
  test('200: Responds with the updated user object', () => {
    return request(app)
      .patch('/api/users/testuser1')
      .send({ email: 'testuserpatched@example.com', password: 'testchange' })
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user.email).toBe('testuserpatched@example.com');
      });
  });
  test('400: Responds with "bad request" when passed an invalid field to updated', () => {
    return request(app)
      .patch('/api/users/testuser1')
      .send({ banana: 'testuserpatched@example.com' })
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('bad request');
      });
  });
  test('400: Responds with "invalid email address" when passed an invalid email address', () => {
    return request(app)
      .patch('/api/users/testuser1')
      .send({ email: 'banana' })
      .expect(400)
      .then(({ body }) => {
        expect(body.status).toBe(400);
        expect(body.msg).toBe('invalid email address');
      });
  });
  test('404: Responds with "user not found" when passing an username that does not exist', () => {
    return request(app)
      .patch('/api/users/banana')
      .send({ email: 'testuserpatched@example.com' })
      .expect(404)
      .then(({ body }) => {
        expect(body.status).toBe(404);
        expect(body.msg).toBe('user not found');
      });
  });
});
