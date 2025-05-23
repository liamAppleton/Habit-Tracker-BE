const { fetchUsers, fetchUserByUsername } = require('../models');

module.exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

module.exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username).then((user) => {
    res.status(200).send({ user });
  });
};
