const express = require('express');
const controllers = require('./../controllers/controllers');
const middleware = require('./../middlewares/middleware');

const router = express.Router();

router.route('/signup').post(controllers.signup);
router.route('/login').post(controllers.login);
router.route('/getdata').get(middleware.protect, controllers.getdata);

module.exports = router;
