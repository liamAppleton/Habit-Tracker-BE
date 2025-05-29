const habitsRouter = require('express').Router();
const { getHabits, getHabitById } = require('../controllers');

habitsRouter.route('/').get(getHabits);

habitsRouter.route('/:habit_id').get(getHabitById);

module.exports = habitsRouter;
