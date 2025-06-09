const {
  fetchHabitLogs,
  fetchHabitLogsByHabitId,
  addHabitLogByHabitId,
  removeHabitLog,
} = require('../models');

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

exports.postHabitLogByHabitId = (req, res, next) => {
  const { habit_id } = req.params;
  addHabitLogByHabitId(habit_id)
    .then((habitLog) => {
      res.status(200).send({ habitLog });
    })
    .catch((err) => next(err));
};

exports.deleteHabitLog = (req, res, next) => {
  const { log_id } = req.params;
  removeHabitLog(log_id).then(() => {
    res.status(204).send();
  });
};
