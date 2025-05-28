const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const {
  handleNotARouteError,
  handlePsqlError,
  handleCustomError,
  handleServerError,
} = require('./error-handlers/errorHandlers');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.all('*', handleNotARouteError);

app.use(handlePsqlError);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
