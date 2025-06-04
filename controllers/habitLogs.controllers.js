const { fetchHabitLogs, fetchHabitLogsByHabitId } = require('../models');

exports.getHabitLogs = (req, res, next) => {
  fetchHabitLogs().then((habitLogs) => {
    res.status(200).send({ habitLogs });
  });
};

exports.getHabitLogsByHabitId = (req, res, next) => {
  const { habitId } = req.params;
  fetchHabitLogsByHabitId(habitId).then((habitLogs) => {
    res.status(200).send({ habitLogs });
  });
};
