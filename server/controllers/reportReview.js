const models = require('../models');

module.exports = (req, res) => {
  const review_id = req.params['0'];
  models.reportReview(review_id, (data) => {
    if (data) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404);
    }
  })
}