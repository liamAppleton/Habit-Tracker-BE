const habitLogsRouter = require('express').Router();
const {
  getHabitLogs,
  getHabitLogsByHabitId,
  postHabitLogByHabitId,
  deleteHabitLog,
} = require('../controllers');

habitLogsRouter.route('/').get(getHabitLogs);

habitLogsRouter
  .route('/:habit_id')
  .get(getHabitLogsByHabitId)
  .post(postHabitLogByHabitId);

habitLogsRouter.route('/:habit_id/:log_id').delete(deleteHabitLog);

module.exports = habitLogsRouter;
