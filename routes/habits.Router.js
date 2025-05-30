const habitsRouter = require('express').Router();
const { getHabits, getHabitById, postHabit } = require('../controllers');

habitsRouter.route('/').get(getHabits).post(postHabit);

habitsRouter.route('/:habit_id').get(getHabitById);

module.exports = habitsRouter;
