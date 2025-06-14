const { getEndpoints } = require('./endPoints.controllers');
const {
  getUsers,
  getUserByUsername,
  getHabitsByUsername,
  postUser,
  patchUserByUsername,
  deleteUser,
} = require('./users.controllers');
const {
  getHabits,
  getHabitById,
  postHabit,
  deleteHabit,
} = require('./habits.controllers');
const {
  getHabitLogs,
  getHabitLogsByHabitId,
  postHabitLogByHabitId,
  deleteHabitLog,
} = require('./habitLogs.controllers');

module.exports = {
  getEndpoints,
  getUsers,
  getUserByUsername,
  getHabitsByUsername,
  postUser,
  patchUserByUsername,
  deleteUser,
  getHabits,
  getHabitById,
  postHabit,
  deleteHabit,
  getHabitLogs,
  getHabitLogsByHabitId,
  postHabitLogByHabitId,
  deleteHabitLog,
};
