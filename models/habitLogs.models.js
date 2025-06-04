const db = require('../db/connection');

exports.fetchHabitLogs = () => {
  return db.query('SELECT * FROM habit_logs').then(({ rows }) => {
    return rows;
  });
};

exports.fetchHabitLogsByHabitId = (habitId) => {
  return db
    .query('SELECT * FROM habit_logs WHERE habit_id = $1', [habitId])
    .then(({ rows }) => {
      return rows;
    });
};
