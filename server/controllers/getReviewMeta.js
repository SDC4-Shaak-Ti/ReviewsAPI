const models = require('../models');

module.exports = (req, res) => {
  const productId = req.params.product_id;
  models.getReviewMeta(productId)
    .then((data) => {
      res.send(data);
    })
}