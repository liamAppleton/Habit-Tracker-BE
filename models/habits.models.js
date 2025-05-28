const db = require('../db/connection.js');

exports.fetchHabits = () => {
  return db.query('SELECT * FROM habits').then(({ rows }) => {
    return rows;
  });
};
