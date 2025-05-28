const usersRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
  postUser,
  patchUserByUsername,
} = require('../controllers');

usersRouter.route('/').get(getUsers).post(postUser);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch(patchUserByUsername);

module.exports = usersRouter;
