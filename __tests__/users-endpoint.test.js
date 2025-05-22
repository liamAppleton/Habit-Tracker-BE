const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection/js');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET /api/users', () => {});
