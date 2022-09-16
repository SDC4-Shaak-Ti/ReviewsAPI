const pool = require('../db');

module.exports = (id, page, count, sort, callback) => {
  if (sort === 'newest') sort = 'date DESC';
  if (sort === 'helpful') sort = 'helpfulness DESC';
  if (sort === 'relevant') sort = 'date DESC, helpfulness DESC';

  pool.connect((err, client, release) => {
    var data = {
      product: id,
      page: page,
      count: count,
      results: []
    }

    const query = `
      SELECT *
      FROM reviews
      JOIN photos
      ON reviews.id = photos.review_id
      WHERE product_id = ${id}
      ORDER BY ${sort}
      LIMIT ${count}
      OFFSET ${page}
    `
    client.query(query)
      .then(result => {
        release();
        result.rows.forEach(row => {
          var obj = {
            review_id: row.id,
            rating: row.rating,
            summary: row.summary,
            recommend: row.recommend,
            response: row.response,
            body: row.body,
            reviewer_name: row.reviewer_name,
            helpfulness: row.helpfulness,
            photos: []
          };
          obj.date = new Date(Number(row.date)).toISOString();
          data.results.push(obj);
          let photo = {
            id: row.review_id,
            url: row.url
          }
          obj.photos.push(photo);
        });
        callback(data)
      })
  })
}