var express = require('express');
var router = express();
var controller = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/auth.middleware');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

module.exports = router;

router.get('/', controller.getPage);

// page = n, x items per page
// begin = (n-1) * x
// end = (n-1) * x + x = n*x
// items = arr.slice(begin, end)

router.get('/create', authMiddleware.requireAuth, controller.createProduct);

router.get('/search', controller.searchProduct);

router.post('/create', upload.single('img'), authMiddleware.requireAuth, controller.postCreateProduct);