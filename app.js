const express = require('express');
const app = express();
const cors = require('cors');
const endPoints = require('./endpoints.json');
const { getUsers } = require('./controllers');
const {
  handleNotARouteError,
  handlePsqlError,
  handleServerError,
} = require('./error-handlers/errorHandlers.js');

app.use(cors());

app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).send(endPoints);
});

app.get('/api/users', getUsers);

app.all('*', handleNotARouteError);

app.use(handlePsqlError);

app.use(handleServerError);

module.exports = app;
