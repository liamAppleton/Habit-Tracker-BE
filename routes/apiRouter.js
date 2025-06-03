const apiRouter = require('express').Router();
const endPointsRouter = require('./endPointsRouter');
const usersRouter = require('./usersRouter');
const habitsRouter = require('./habitsRouter');
const habitLogsRouter = require('./habitLogsRouter');

apiRouter.use('/', endPointsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/habits', habitsRouter);

apiRouter.use('/habit-logs', habitLogsRouter);

module.exports = apiRouter;
