const pool = require('../db');

module.exports = (id, page, count, sort, callback) => {
  if (sort === 'newest') sort = 'order by date';
  if (sort === 'helpful') sort = 'order by helpfulness';
  if (sort === 'relevant') sort = 'order by helpfulness, date';

  pool.connect((err, client, release) => {
    var data = {
      product: id,
      page: page,
      count: count,
      results: []
    }
    client.query(`SELECT * FROM reviews WHERE product_id = ${id}`)
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
            helpfulness: row.helpfulness
          };
          obj.date = new Date(Number(row.date)).toISOString();
          data.results.push(obj);
        })
        callback(data)
      })
  })
}