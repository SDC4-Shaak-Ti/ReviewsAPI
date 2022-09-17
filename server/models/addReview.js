const pool = require('../db');

module.exports = (productId, data, callback) => {
  pool.connect((err, client, release) => {
    if (data.recommend === 'true') {
      data.recommend = true;
    } else {
      data.recommend = false;
    }
    var query = `
      SELECT id
      FROM reviews
      ORDER BY id DESC
      LIMIT 1
    `
    client.query(query)
      .then(result => {
        (result.rows[0].id)
        var text = `
          INSERT INTO Reviews (
            id,
            product_id,
            rating,
            date,
            summary,
            body,
            recommend,
            reported,
            reviewer_name,
            reviewer_email,
            response,
            helpfulness
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `
        var values = [
          result.rows[0].id + 1,
          Number(productId),
          Number(data.rating),
          (Math.floor(new Date().getTime() / 1000)).toString(),
          data.summary,
          data.body,
          data.recommend,
          false,
          data.name,
          data.email,
          null,
          0
        ]
        client.query(text, values)
          .then(result => {
            release();
            callback(true)
          })
          .catch(err => {
            callback(err)
          })
      })
  })
}