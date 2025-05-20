const db = require('../db/connection.js');
const data = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('seed', () => {
  describe('users table', () => {
    test('users table exists', () => {
      return db
        .query(
          `SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'users');`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test('users table has username column of varying char', () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'username'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('username');
          expect(column.data_type).toBe('character varying');
        });
    });
  });
});
