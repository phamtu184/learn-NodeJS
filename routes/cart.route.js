var express = require('express');
var router = express();
var controller = require('../controllers/cart.controller');

module.exports = router;

router.get('/add/:productId', controller.addId);

router.get('/', controller.index);

router.post('/', controller.postCart);
