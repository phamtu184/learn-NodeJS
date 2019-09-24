var express = require('express');
var router = express();
var controller = require('../controllers/user.controller');

// var controller = require('../controllers/user.controller');

module.exports = router;

router.get('/', controller.index);

router.get('/search', controller.searchUser);

router.get('/:id', controller.getUser);

router.post('/tien', controller.postUser);


