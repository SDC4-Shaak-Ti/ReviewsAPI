const pool = require('../db');

module.exports = (id, callback) => {
  pool.connect((err, client, release) => {
    var query = `
      UPDATE reviews
      SET reported = true
      WHERE id = ${id}
    `
    pool.query(query)
      .then(result => {
        callback(true);
      })
      .catch((err) => {
        callback(false);
      })
  })
}