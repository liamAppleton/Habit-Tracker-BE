const {
  getUsers,
  getUserByUsername,
  postUser,
  patchUserByUsername,
} = require('./users.controllers');
const { getHabits } = require('./habits.controllers');

module.exports = {
  getUsers,
  getUserByUsername,
  postUser,
  patchUserByUsername,
  getHabits,
};
