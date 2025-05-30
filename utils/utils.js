const db = require('../db/connection');
const format = require('pg-format');

exports.throwError = (status, msg) => Promise.reject({ status, msg });

exports.checkExists = (table, column, value) => {
  const queryString = format('SELECT * FROM %I WHERE %I = $1', table, column);
  return db.query(queryString, [value]).then(({ rows }) => {
    return true;
  });
};
