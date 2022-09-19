const pool = require('../db');

module.exports = async (productId, data, callback) => {
  const client = await pool.connect();
  data.photos = JSON.parse(data.photos);
  data.characteristics = JSON.parse(data.characteristics);
  var reviewQuery = `
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
  var reviewValues = [
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
  const reviewResult = await client.query(reviewQuery, reviewValues)
  if (reviewResult.rowCount === 1) {
    data.photos.forEach(async (photo) => {
      var photoQuery = `
        INSERT INTO photos (
          review_id,
          url
        )
        VALUES ((SELECT id FROM reviews ORDER BY id DESC LIMIT 1), $1)
      `
      const photoValues = [
        photo
      ]
      await client.query(photoQuery, photoValues)
    })
    for (var key in data.characteristics) {
      var charQuery = `
        INSERT INTO char_reviews (
          review_id,
          characteristic_id,
          value
        )
        VALUES ((SELECT id FROM reviews ORDER BY id DESC LIMIT 1), $1, $2)
      `
      var charValues = [
        key,
        data.characteristics[key]
      ]
      await client.query(charQuery, charValues)
    }
  }
  callback(reviewResult)
}