const pool = require('../db');

module.exports = (id=37311) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`SELECT rating, recommend FROM reviews WHERE product_id = ${id}`, (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows);
    })
  })
}