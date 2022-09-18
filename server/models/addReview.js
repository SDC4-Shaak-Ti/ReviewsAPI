const pool = require('../db');

module.exports = (productId, data, callback) => {
  pool.connect((err, client, release) => {
    if (data.recommend === 'true') {
      data.recommend = true;
    } else {
      data.recommend = false;
    }
    var text = `
      INSERT INTO Reviews (
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `
    var values = [
      Number(productId),
      Number(data.rating),
      (new Date()).toISOString(),
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
        callback(result.rows)
      })
  })
}