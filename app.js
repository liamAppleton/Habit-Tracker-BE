const express = require('express');
const app = express();
const cors = require('cors');
const endPoints = require('./endpoints.json');
const {
  getUsers,
  getUserByUsername,
  postUser,
  patchUserByUsername,
  getHabits,
} = require('./controllers');
const {
  handleNotARouteError,
  handlePsqlError,
  handleCustomError,
  handleServerError,
} = require('./error-handlers/errorHandlers');

app.use(cors());

app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).send(endPoints);
});

app.get('/api/users', getUsers);

app.get('/api/users/:username', getUserByUsername);

app.post('/api/users', postUser);

app.patch('/api/users/:username', patchUserByUsername);

app.get('/api/habits', getHabits);

app.all('*', handleNotARouteError);

app.use(handlePsqlError);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
