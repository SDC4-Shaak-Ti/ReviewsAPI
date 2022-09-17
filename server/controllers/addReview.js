const models = require('../models');

module.exports = (req, res) => {
  console.log(req.body, req.params, req.query)
  const productId = req.params['0'];
  const data = req.body;
  models.addReview(productId, data, (result) => {
    if (result) {
      res.sendStatus(201);
    }
  })
}