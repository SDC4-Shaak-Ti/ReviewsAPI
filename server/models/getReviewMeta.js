const pool = require('../db');

module.exports = (id, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    var data = {
      product_id: id,
      ratings: {},
      recommended: {
        false: 0,
        true: 0
      }
    }
    var query = `SELECT rating, recommend FROM reviews WHERE product_id = ${id}`
    client.query(query)
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
        var query = `
          SELECT *
          FROM characteristics
          JOIN characteristic_reviews
          ON characteristics.id = characteristic_reviews.characteristic_id
          WHERE product_id = ${id}
        `
        client.query(query)
          .then(result => {
            var obj = {};
            result.rows.forEach(row => {
              if (obj[row.name]) {
                obj[row.name].value += row.value
                obj[row.name].counter++;
              } else {
                obj[row.name] = {
                  id: row.characteristic_id,
                  value: 0,
                  counter: 0
                }
              }
            })
            for (var key in obj) {
              obj[key].value = (obj[key].value/obj[key].counter).toString();
              delete obj[key].counter;
            }
            data.characteristics = obj;
            callback(data)
          })
      })
      .catch(err => {
        console.error(err.stack);
      })
  })
}