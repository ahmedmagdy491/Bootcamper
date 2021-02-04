const express = require('express');
const { getCourses, getSingleCourse, addCourse, updateCourse, deleteCourse} = require('../controller/courses');
const Course = require('../model/Course');

const router = express.Router({ mergeParams: true });


const advamcedResults = require('../../middleware/advancedResults');
const {protect, authorize} = require('../../Authenticates/middlewares/auth')


router.route('/').get( advamcedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
}) ,getCourses).post(protect, authorize('publisher', 'admin'),  addCourse)

router
    .route('/:id')
    .get(getSingleCourse)
    .put(protect, authorize('publisher', 'admin'),  updateCourse)
    .delete(protect, authorize('publisher', 'admin'),  deleteCourse);


module.exports = router;
