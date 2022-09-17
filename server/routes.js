const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/reviews/*/list', controllers.getReviews);
router.get('/reviews/*/meta', controllers.getReviewMeta);
router.post('/reviews/*', controllers.addReview);
router.put('/reviews/helpful/*', controllers.markReviewHelpful);
router.put('/reviews/*/report', controllers.reportReview);

module.exports = router;