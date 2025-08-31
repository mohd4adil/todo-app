const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginHandler');
const { checkStatus } = require('../controllers/checkLogin')
const googleAuth  = require('../controllers/googleAuth')
const { signUp } = require('../controllers/signUpHandler');
const { logout } = require('../controllers/logout');

router.post('/login', loginUser);
router.post('/signup', signUp)
router.post('/logout', logout)

router.post('/checkLogin', checkStatus);
router.get('/auth/google', googleAuth.googleLogin.bind(googleAuth))
router.get('/auth/google/callback', googleAuth.googleCallback.bind(googleAuth))

module.exports = router;
