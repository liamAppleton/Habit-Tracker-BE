const db = require('../db/connection');
const { checkExists } = require('../utils/utils');
const format = require('pg-format');

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

exports.addHabitLogByHabitId = (habitId) => {
  return checkExists('habits', 'habit_id', habitId)
    .then((exists) => {
      if (!exists) throw { status: 404, msg: 'habit not found' };
      const queryString = format(
        `
    INSERT INTO habit_logs
    (habit_id, date)
    VALUES %L RETURNING *`,
        [[habitId, new Date()]]
      );

      return db.query(queryString);
    })
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeHabitLog = (habitId, logId) => {
  const promises = [
    checkExists('habits', 'habit_id', habitId),
    checkExists('habit_logs', 'log_id', logId),
  ];

  return Promise.all(promises)
    .then(([habitExists, logExists]) => {
      if (!habitExists || !logExists)
        throw {
          status: 404,
          msg: `${!habitExists ? 'habit' : 'log'} not found`,
        };
      return db.query('DELETE FROM habit_logs WHERE log_id = $1', [logId]);
    })
    .then(() => {
      return;
    });
};
