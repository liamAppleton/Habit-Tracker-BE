const db = require('../connection.js');
const format = require('pg-format');

const createUsers = (userData) => {
  return db
    .query(
      `CREATE TABLE users
        (username VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        PRIMARY KEY (username))`
    )
    .then(() => {
      const formattedUsers = userData.map(
        ({ username, email, password, created_at, updated_at }) => {
          return [username, email, password, created_at, updated_at];
        }
      );
      const queryString = format(
        `INSERT INTO users
            (username, email, password, created_at, updated_at)
            VALUES %L RETURNING *`,
        formattedUsers
      );
      return db.query(queryString);
    });
};

const seed = ({ userData, habitData, habitLogData }) => {
  return db
    .query('DROP TABLE IF EXISTS users')
    .then(() => createUsers(userData));
};

module.exports = seed;
