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
        PRIMARY KEY (username))`
    )
    .then(() => {
      const formattedUsers = userData.map(
        ({ username, email, password, created_at }) => {
          return [username, email, password, created_at];
        }
      );
      const queryString = format(
        `INSERT INTO users
            (username, email, password, created_at)
            VALUES %L RETURNING *`,
        formattedUsers
      );
      return db.query(queryString);
    });
};

const createHabits = (habitData) => {
  return db
    .query(
      `CREATE TABLE habits (
        habit_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL REFERENCES users(username),
        name VARCHAR NOT NULL,
        frequency VARCHAR NOT NULL,
        status VARCHAR NOT NULL,
        streak_count INT NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP
);`
    )
    .then(() => {
      const formattedHabits = habitData.map(
        ({
          username,
          name,
          frequency,
          status,
          streak_count,
          created_at,
          updated_at,
        }) => {
          return [
            username,
            name,
            frequency,
            status,
            streak_count,
            created_at,
            updated_at,
          ];
        }
      );
      const queryString = format(
        `INSERT INTO habits
          (username, name, frequency, status, streak_count, created_at, updated_at)
          VALUES %L RETURNING *`,
        formattedHabits
      );
      return db.query(queryString);
    });
};

const createHabitLogs = (habitLogData) => {
  return db
    .query(
      `
    CREATE TABLE habit_logs
    (log_id SERIAL PRIMARY KEY,
    habit_id INT NOT NULL REFERENCES habits(habit_id),
    date VARCHAR NOT NULL,
    status VARCHAR NOT NULL)`
    )
    .then(() => {
      const formattedHabitLogs = habitLogData.map(
        ({ habit_id, date, status }) => {
          return [habit_id, date, status];
        }
      );
      const queryString = format(
        `
          INSERT INTO habit_logs
        (habit_id, date, status)
        VALUES %L RETURNING *`,
        formattedHabitLogs
      );
      return db.query(queryString);
    });
};

const seed = ({ userData, habitData, habitLogData }) => {
  return db
    .query('DROP TABLE IF EXISTS habit_logs')
    .then(() => db.query('DROP TABLE IF EXISTS habits'))
    .then(() => db.query('DROP TABLE IF EXISTS users'))
    .then(() => createUsers(userData))
    .then(() => createHabits(habitData))
    .then(() => createHabitLogs(habitLogData));
};

module.exports = seed;
