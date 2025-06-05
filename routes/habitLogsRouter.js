const habitLogsRouter = require('express').Router();
const {
  getHabitLogs,
  getHabitLogsByHabitId,
  postHabitLogByHabitId,
} = require('../controllers');

habitLogsRouter.route('/').get(getHabitLogs);

habitLogsRouter
  .route('/:habit_id')
  .get(getHabitLogsByHabitId)
  .post(postHabitLogByHabitId);

module.exports = habitLogsRouter;
