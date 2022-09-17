const pool = require('../db');

module.exports = (id, callback) => {
  pool.connect((err, client, release) => {
    const query = `
      UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE id = ${id}
    `
    client.query(query)
      .then(result => {
        release();
        callback(true);
      })
      .catch((err) => {
        callback(err);
      })
  })
}