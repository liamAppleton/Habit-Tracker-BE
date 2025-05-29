const { fetchHabits, fetchHabitById } = require('../models');

exports.getHabits = (req, res, next) => {
  fetchHabits().then((habits) => {
    res.status(200).send({ habits });
  });
};

exports.getHabitById = (req, res, next) => {
  const { habit_id } = req.params;
  fetchHabitById(habit_id)
    .then((habit) => {
      res.status(200).send({ habit });
    })
    .catch((err) => next(err));
};
