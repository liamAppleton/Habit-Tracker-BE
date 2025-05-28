const { fetchHabits } = require('../models');

exports.getHabits = (req, res, next) => {
  fetchHabits().then((habits) => {
    res.status(200).send({ habits });
  });
};
