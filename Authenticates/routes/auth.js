
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
    logout
} = require('../controller/auth');

const {protect} = require('../middlewares/auth');
const router = require('express').Router();

router
    .route('/register')
    .post(register)

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .get(protect, logout)

router
    .route('/me')
    .get(protect, getMe)

router
    .route('/updatedetails')
    .put(protect, updateDetails)

router
    .route('/updatepassword')
    .put(protect, updatePassword)


router
    .route('/forgotpassword')
    .post(forgotPassword)

router
    .route('/resetpassword/:resettoken')
    .put(resetPassword)


module.exports = router;
