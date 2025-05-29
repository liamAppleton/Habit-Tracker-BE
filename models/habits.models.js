const db = require('../db/connection.js');
const { throwError } = require('../utils/utils.js');

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
