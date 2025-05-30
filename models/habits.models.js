const db = require('../db/connection.js');
const { throwError } = require('../utils/utils.js');
const format = require('pg-format');

exports.fetchHabits = () => {
  return db.query('SELECT * FROM habits').then(({ rows }) => {
    return rows;
  });
};

exports.fetchHabitById = (habit_id) => {
  return db
    .query('SELECT * FROM habits WHERE habit_id = $1', [habit_id])
    .then(({ rows }) => {
      if (rows.length === 0) return throwError(404, 'habit not found');
      return rows[0];
    });
};

exports.addHabit = ({ username, name, frequency }) => {
  const queryString = format(
    `
    INSERT INTO habits
  (username, name, frequency, streak_count, created_at)
  VALUES %L RETURNING *`,
    [[username, name, frequency, 0, new Date()]]
  );
  return db.query(queryString).then(({ rows }) => {
    return rows[0];
  });
};
