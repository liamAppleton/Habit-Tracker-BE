const format = require('pg-format');
const db = require('../db/connection.js');
const { throwError } = require('../utils/utils.js');

exports.fetchUsers = () => {
  return db.query('SELECT * FROM users').then(({ rows }) => {
    return rows;
  });
};

exports.fetchUserByUsername = (username) => {
  return db
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then(({ rows }) => {
      if (rows.length === 0) return throwError(404, 'user not found');
      return rows[0];
    });
};

exports.addUser = ({ username, email, password }) => {
  const queryString = format(
    `
    INSERT INTO users
    (username, email, password, created_at)
    VALUES %L RETURNING *`,
    [[username, email, password, new Date()]]
  );

  return db.query(queryString).then(({ rows }) => {
    return rows[0];
  });
};

exports.updateUserByUsername = (username, body) => {
  const valueToUpdate = Object.values(body)[0];
  const fieldToUpdate = Object.keys(body)[0];

  const allowedFields = ['email', 'password'];
  if (!allowedFields.includes(fieldToUpdate)) {
    return throwError(400, 'bad request');
  }

  if (!valueToUpdate.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return throwError(400, 'invalid email address');
  }

  return db
    .query(
      `
    UPDATE users
    SET ${fieldToUpdate} = $1
    WHERE username = $2
    RETURNING *`,
      [valueToUpdate, username]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return throwError(404, 'user not found');
      }
      return rows[0];
    });
};
