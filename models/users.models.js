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
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: 'user not found' });
      return rows[0];
    });
};

exports.addUser = ({ username, email, password }) => {
  const queryString = format(
    `
    INSERT INTO users
    (username, email, password, created_at, updated_at)
    VALUES %L RETURNING *`,
    [[username, email, password, new Date(), null]]
  );

  return db.query(queryString).then(({ rows }) => {
    return rows[0];
  });
};
