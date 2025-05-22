module.exports.handleNotARouteError = (req, res, next) => {
  res.status(404).send({ status: 404, msg: 'not a round' });
};

module.exports.handlePsqlError = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ status: 400, msg: 'bad request' });
  } else next(err);
};

module.exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
};
