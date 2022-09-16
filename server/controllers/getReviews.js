const models = require('../models');

module.exports = (req, res) => {
  const productId = req.params['0'];
  const sort = req.query.sort;
  const count = req.query.count || '5';
  const page = req.query.page || '1';
  models.getReviews(productId, page, count, sort, (data) => {
    res.send(data);
  })
}