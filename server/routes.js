const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/reviews/:product_id/list', controllers.getReviews);
router.get('/reviews/:product_id/meta', controllers.getReviewMeta);
router.post('/reviews/:product_id', controllers.addReview);
router.put('/reviews/helpful/:review_id', controllers.markReviewHelpful);
router.put('/reviews/report/:review_id', controllers.reportReview);

module.exports = router;