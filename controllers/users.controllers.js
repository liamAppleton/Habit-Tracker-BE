const { fetchUsers, fetchUserByUsername, addUser } = require('../models');

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => next(err));
};

exports.postUser = (req, res, next) => {
  const user = req.body;
  addUser(user)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => next(err));
};
