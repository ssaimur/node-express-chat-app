// import external modules
const express = require('express');

// import internal modules
const { getInbox } = require('../controllers/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// create the router
const router = express.Router();

// login page
router.get('/', decorateHtmlResponse('Inbox'), getInbox);

module.exports = router;
