const {
  fetchUsers,
  fetchUserByUsername,
  fetchHabitsByUsername,
  addUser,
  updateUserByUsername,
} = require('./users.models');
const { fetchHabits, fetchHabitById } = require('./habits.models');

module.exports = {
  fetchUsers,
  fetchUserByUsername,
  fetchHabitsByUsername,
  addUser,
  updateUserByUsername,
  fetchHabits,
  fetchHabitById,
};
