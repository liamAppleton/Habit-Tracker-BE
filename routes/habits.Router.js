const habitsRouter = require('express').Router();
const { getHabits } = require('../controllers');

habitsRouter.route('/').get(getHabits);

module.exports = habitsRouter;
