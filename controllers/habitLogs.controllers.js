const { fetchHabitLogs } = require('../models');

exports.getHabitLogs = (req, res, next) => {
  fetchHabitLogs().then((habitLogs) => {
    res.status(200).send({ habitLogs });
  });
};
