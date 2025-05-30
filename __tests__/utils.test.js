const { checkExists } = require('../utils/utils');
const db = require('../db/connection');

afterAll(() => db.end());

describe('checkExists()', () => {
  test('should return true when value does exist', () => {
    return checkExists('users', 'username', 'testuser1').then((result) => {
      expect(result).toBe(true);
    });
  });
  test('should return false when value does not exist', () => {
    return checkExists('users', 'username', 'banana').then((result) => {
      expect(result).toBe(false);
    });
  });
});
