const {
  fetchUsers,
  fetchUserByUsername,
  addUser,
  updateUserByUsername,
} = require('./users.models');
const { fetchHabits } = require('./habits.models');

module.exports = {
  fetchUsers,
  fetchUserByUsername,
  addUser,
  updateUserByUsername,
  fetchHabits,
};
