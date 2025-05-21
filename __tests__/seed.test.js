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
    test('users table has username column of varying character', () => {
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
    test('users table has username column as the primary key', () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type= 'PRIMARY KEY'
            AND tc.table_name = 'users';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe('username');
        });
    });
    test('users table has email column of varying character', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'email'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('email');
          expect(column.data_type).toBe('character varying');
        });
    });
    test('users table has created_at column of timestamp', () => {
      return db
        .query(
          `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'created_at'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('created_at');
          expect(column.data_type).toBe('timestamp without time zone');
        });
    });
    test('users table has updated_at column of timestamp', () => {
      return db
        .query(
          `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'updated_at'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('updated_at');
          expect(column.data_type).toBe('timestamp without time zone');
        });
    });
  });

  describe('habits table', () => {
    test('habits table exists', () => {
      return db
        .query(
          `SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'habits');`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
    test('habits table has habit_id column as the primary key', () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type= 'PRIMARY KEY'
            AND tc.table_name = 'habits';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe('habit_id');
        });
    });
    test('habits table has username column of varying character', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'username'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('username');
          expect(column.data_type).toBe('character varying');
        });
    });
    test('habits table has name column of varying character', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'name'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('name');
          expect(column.data_type).toBe('character varying');
        });
    });
    test('habits table has frequency column of varying character', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'frequency'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('frequency');
          expect(column.data_type).toBe('character varying');
        });
    });
    test('habits table has status column of varying character', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'status'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('status');
          expect(column.data_type).toBe('character varying');
        });
    });
    test('habits table has streak_count column as integer', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'streak_count'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('streak_count');
          expect(column.data_type).toBe('integer');
        });
    });
    test('habits table has created_at column as timestamp', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'created_at'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('created_at');
          expect(column.data_type).toBe('timestamp without time zone');
        });
    });
    test('habits table has updated_at column as timestamp', () => {
      return db
        .query(
          `
            SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'habits'
            AND column_name = 'updated_at'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('updated_at');
          expect(column.data_type).toBe('timestamp without time zone');
        });
    });
  });
});
