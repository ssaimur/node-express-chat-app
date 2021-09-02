// import external modules
const express = require('express');

// import internal modules
const { getLogin } = require('../controllers/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// create the router
const router = express.Router();

// login page
router.get('/', decorateHtmlResponse('Login'), getLogin);

module.exports = router;
