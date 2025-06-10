exports.handleNotARouteError = (req, res, next) => {
  console.log('404 reached');
  res.status(404).send({ status: 404, msg: 'not a route' });
};

exports.handlePsqlError = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ status: 400, msg: 'bad request' });
  } else next(err);
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ status: err.status, msg: err.msg });
  } else next(err);
};

exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
};
