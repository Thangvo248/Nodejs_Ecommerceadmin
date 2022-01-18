var express = require('express');
var router = express.Router();
const {verifyAccessToken} = require('../../middlewares/authJwt')

const UserController = require('./userController');



router.get('/login', UserController.login);

router.get('/logout', UserController.login)

router.get('/', UserController.profile);
router.post('/submitLogin', UserController.submitLogin);
router.get('/logout',verifyAccessToken ,UserController.Logout);
module.exports = router;