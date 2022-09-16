const pool = require('../db');

module.exports = (id, callback) => {
  pool.connect((err, client, release) => {
    var data = {
      product_id: id,
      ratings: {},
      recommended: {
        false: 0,
        true: 0
      },
      characteristics: {}
    }
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(`SELECT rating, recommend FROM reviews WHERE product_id = ${id}`)
      .then(result => {
        result.rows.forEach(row => {
          var rating = row.rating;
          var rec = row.recommend;
          if (data.ratings[rating]) {
            data.ratings[rating]++;
          } else {
            data.ratings[rating] = 1;
          }
          if (rec) {
            data.recommended.true++;
          } else {
            data.recommended.false++;
          }
        })
      })
      .then(() => {
        client.query(`SELECT * FROM characteristics WHERE product_id = ${id}`)
        .then(result => {
          release();
            console.log(result.rows);
            console.log('data: ', data)
          })
      })
      .catch(err => {
        console.error(err.stack);
      })
  })
}