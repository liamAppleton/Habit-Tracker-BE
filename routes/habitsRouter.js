const habitsRouter = require('express').Router();
const {
  getHabits,
  getHabitById,
  postHabit,
  deleteHabit,
} = require('../controllers');

habitsRouter.route('/').get(getHabits).post(postHabit);

habitsRouter.route('/:habit_id').get(getHabitById).delete(deleteHabit);

module.exports = habitsRouter;
