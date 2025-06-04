const habitLogsRouter = require('express').Router();
const { getHabitLogs, getHabitLogsByHabitId } = require('../controllers');

habitLogsRouter.route('/').get(getHabitLogs);

habitLogsRouter.route('/:habit_id').get(getHabitLogsByHabitId);

module.exports = habitLogsRouter;
