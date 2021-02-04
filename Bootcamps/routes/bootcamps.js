const {
	getBootcamps,
	createBootcamp,
	getBootcamp,
	updateBootcamp,
	deleteBootcamp,
	getBootcampsInRadius,
	bootcampPhotoUpload
} = require('../controller/bootcamps');
// Include other resource router
const courseRouter = require('../../Courses/routes/courses')
const reviewRouter = require('../../Reviews/routes/review')
const errorHandler = require('../../Errors/middleware/error')
const Bootcamp = require('../../Bootcamps/model/Bootcamps')


const router = require('express').Router();



const advancedResults = require('../../middleware/advancedResults');
const {protect, authorize} = require('../../Authenticates/middlewares/auth')

// Re-route into other resource route
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)
router
	.route('/radius/:zipcode/:distance')
	.get(getBootcampsInRadius)

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses') , getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp)

router
	.route('/:id')
	.get(getBootcamp)
	.put(protect, authorize('publisher', 'admin'),  updateBootcamp)
	.delete(protect, authorize('publisher', 'admin'),  deleteBootcamp);


module.exports = router;
