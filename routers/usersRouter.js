// import external modules
const express = require('express');

// import internal modules
const { getUsers } = require('../controllers/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// create the router
const router = express.Router();

// login page
router.get('/', decorateHtmlResponse('Users'), getUsers);

module.exports = router;
