const db = require('../db/connection');
const { checkExists } = require('../utils/utils');

exports.fetchHabitLogs = () => {
  return db.query('SELECT * FROM habit_logs').then(({ rows }) => {
    return rows;
  });
};

exports.fetchHabitLogsByHabitId = (habitId) => {
  return checkExists('habits', 'habit_id', habitId)
    .then((exists) => {
      if (!exists) throw { status: 404, msg: 'habit not found' };
      return db.query('SELECT * FROM habit_logs WHERE habit_id = $1', [
        habitId,
      ]);
    })
    .then(({ rows }) => {
      return rows;
    });
};
