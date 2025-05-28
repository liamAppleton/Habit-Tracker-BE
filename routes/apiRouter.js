const apiRouter = require('express').Router();
const endPointsRouter = require('./endPointsRouter');
const usersRouter = require('./usersRouter');
const habitsRouter = require('./habits.Router');

apiRouter.use('/', endPointsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/habits', habitsRouter);

module.exports = apiRouter;
