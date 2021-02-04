const express = require('express');
const {
    getReviews,
    getSingleReview,
    addReview,
	updateReview,
	deleteReview
} = require('../controller/review');
const Review = require('../model/Review');

const router = express.Router({ mergeParams: true });

const advamcedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../Authenticates/middlewares/auth');

router
	.route('/')
	.get(
		advamcedResults(Review, {
			path: 'bootcamp',
			select: 'name description',
		}),
		getReviews
	).post(protect, authorize('user', 'admin'),addReview)


router
	.route('/:id')
	.get(getSingleReview)
	.put(protect, authorize('user', 'admin') ,updateReview)
	.delete(protect, authorize('user', 'admin') ,deleteReview)

module.exports = router;
