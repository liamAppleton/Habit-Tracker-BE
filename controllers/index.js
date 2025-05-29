const { getEndpoints } = require('./endPoints.controllers');
const {
  getUsers,
  getUserByUsername,
  getHabitsByUsername,
  postUser,
  patchUserByUsername,
} = require('./users.controllers');
const { getHabits } = require('./habits.controllers');

module.exports = {
  getEndpoints,
  getUsers,
  getUserByUsername,
  getHabitsByUsername,
  postUser,
  patchUserByUsername,
  getHabits,
};
