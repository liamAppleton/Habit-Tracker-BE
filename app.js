const express = require('express');
const app = express();
const cors = require('cors');
const endPoints = require('./endpoints.json');

app.use(cors());

app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).send(endPoints);
});

module.exports = app;
