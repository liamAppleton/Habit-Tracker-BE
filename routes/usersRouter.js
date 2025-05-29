const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
  getHabitsByUsername,
  postUser,
  patchUserByUsername,
} = require('../controllers');

usersRouter.route('/').get(getUsers).post(postUser);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch(patchUserByUsername);

usersRouter.route('/:username/habits').get(getHabitsByUsername);

module.exports = usersRouter;
