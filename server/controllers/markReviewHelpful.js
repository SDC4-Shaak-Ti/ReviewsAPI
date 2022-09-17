const models = require('../models');

module.exports = (req, res) => {
  const reviewId = req.params['0'];
  models.markReviewHelpful(reviewId, (data) => {
    if (data) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  })
}