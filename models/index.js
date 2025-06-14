const {
  fetchUsers,
  fetchUserByUsername,
  fetchHabitsByUsername,
  addUser,
  updateUserByUsername,
  removeUser,
} = require('./users.models');
const {
  fetchHabits,
  fetchHabitById,
  addHabit,
  removeHabit,
} = require('./habits.models');
const {
  fetchHabitLogs,
  fetchHabitLogsByHabitId,
  addHabitLogByHabitId,
  removeHabitLog,
} = require('./habitLogs.models');

module.exports = {
  fetchUsers,
  fetchUserByUsername,
  fetchHabitsByUsername,
  addUser,
  updateUserByUsername,
  removeUser,
  fetchHabits,
  fetchHabitById,
  addHabit,
  removeHabit,
  fetchHabitLogs,
  fetchHabitLogsByHabitId,
  addHabitLogByHabitId,
  removeHabitLog,
};
