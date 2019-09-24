var express = require('express');
var router = express();
var controller = require('../controllers/auth.controller');

module.exports = router;

router.get('/', controller.index);

router.post('/login', controller.postAuth);