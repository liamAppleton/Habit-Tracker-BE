const db = require('../db/connection');

exports.fetchHabitLogs = () => {
  return db.query('SELECT * FROM habit_logs').then(({ rows }) => {
    return rows;
  });
};
