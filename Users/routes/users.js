const { getUser, createUser, getUsers, updateUser, deleteUser } = require('../controller/users')
const User = require('../model/User');
const router = require("express").Router()

const advancedResults = require('../../middleware/advancedResults');
const {protect, authorize}= require('../../Authenticates/middlewares/auth')

router.use(protect);
router.use(authorize('admin'));

router
    .route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router