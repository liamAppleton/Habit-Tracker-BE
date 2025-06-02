const {
  fetchHabits,
  fetchHabitById,
  addHabit,
  removeHabit,
} = require('../models');

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

exports.postHabit = (req, res, next) => {
  const habit = req.body;
  addHabit(habit)
    .then((habit) => {
      res.status(200).send({ habit });
    })
    .catch((err) => next(err));
};

exports.deleteHabit = (req, res, next) => {
  const { habit_id } = req.params;
  removeHabit(habit_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => next(err));
};
