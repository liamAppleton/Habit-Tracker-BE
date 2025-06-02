const {
  fetchUsers,
  fetchUserByUsername,
  fetchHabitsByUsername,
  addUser,
  updateUserByUsername,
  removeUser,
} = require('../models');

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

exports.getHabitsByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchHabitsByUsername(username)
    .then((habits) => {
      res.status(200).send({ habits });
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

exports.patchUserByUsername = (req, res, next) => {
  const { username } = req.params;
  updateUserByUsername(username, req.body)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => next(err));
};

exports.deleteUser = (req, res, next) => {
  const { username } = req.params;
  removeUser(username).then(() => res.status(204).send());
};
