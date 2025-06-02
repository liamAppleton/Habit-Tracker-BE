const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
  getHabitsByUsername,
  postUser,
  patchUserByUsername,
  deleteUser,
} = require('../controllers');

usersRouter.route('/').get(getUsers).post(postUser);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch(patchUserByUsername)
  .delete(deleteUser);

usersRouter.route('/:username/habits').get(getHabitsByUsername);

module.exports = usersRouter;
