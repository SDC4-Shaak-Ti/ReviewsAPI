const models = require('../models');

module.exports = (req, res) => {
  const productId = req.params['0'];
  const data = req.body;
  console.log(data);
  models.addReview(productId, data, (result) => {
    if (result) {
      res.sendStatus(201);
    }
  })
}