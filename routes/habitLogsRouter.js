const habitLogsRouter = require('express').Router();
const { getHabitLogs } = require('../controllers');

habitLogsRouter.route('/').get(getHabitLogs);

module.exports = habitLogsRouter;
