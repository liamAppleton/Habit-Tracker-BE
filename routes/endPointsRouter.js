const endPointsRouter = require('express').Router();
const { getEndpoints } = require('../controllers');

endPointsRouter.route('/').get(getEndpoints);

module.exports = endPointsRouter;
