const models = require('../models');

module.exports = (req, res) => {
  const productId = req.params['0'];
  models.getReviewMeta(productId, (data) => {
    res.send(data);
  })
}