const db = require('../db/connection.js');

exports.fetchHabits = () => {
  return db.query('SELECT * FROM habits').then(({ rows }) => {
    return rows;
  });
};

exports.fetchHabitById = (habit_id) => {
  return db
    .query('SELECT * FROM habits WHERE habit_id = $1', [habit_id])
    .then(({ rows }) => {
      return rows[0];
    });
};
