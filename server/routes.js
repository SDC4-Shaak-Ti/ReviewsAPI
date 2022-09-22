const express = require('express');
const router = express.Router();
const controllers = require('./controllers');
const path = require('path');

router.get('/reviews/*/list', controllers.getReviews);
router.get('/reviews/*/meta', controllers.getReviewMeta);
router.post('/reviews/*', controllers.addReview);
router.put('/reviews/*/helpful/', controllers.markReviewHelpful);
router.put('/reviews/*/report', controllers.reportReview);
router.get('/loaderio-f27f4de69c553b32d8b5b67bbc71444e', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../loaderio-f27f4de69c553b32d8b5b67bbc71444e.txt'))
})

module.exports = router;