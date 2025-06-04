const { fetchHabitLogs, fetchHabitLogsByHabitId } = require('../models');

exports.getHabitLogs = (req, res, next) => {
  fetchHabitLogs().then((habitLogs) => {
    res.status(200).send({ habitLogs });
  });
};

exports.getHabitLogsByHabitId = (req, res, next) => {
  const { habit_id } = req.params;
  fetchHabitLogsByHabitId(habit_id)
    .then((habitLogs) => {
      res.status(200).send({ habitLogs });
    })
    .catch((err) => next(err));
};
