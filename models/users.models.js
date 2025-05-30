const format = require('pg-format');
const db = require('../db/connection.js');

exports.fetchUsers = () => {
  return db.query('SELECT * FROM users').then(({ rows }) => {
    return rows;
  });
};

exports.fetchUserByUsername = (username) => {
  return db
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then(({ rows }) => {
      if (rows.length === 0) throw { status: 404, msg: 'user not found' };
      return rows[0];
    });
};

exports.fetchHabitsByUsername = (username) => {
  return db
    .query(`SELECT * FROM habits WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) throw { status: 404, msg: 'user not found' };
      return rows;
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
    throw { status: 400, msg: 'bad request' };
  }

  if (!valueToUpdate.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw { status: 400, msg: 'invalid email address' };
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
        throw { status: 404, msg: 'user not found' };
      }
      return rows[0];
    });
};
