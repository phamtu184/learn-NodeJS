var express = require('express');
var router = express();
var db = require('../db.js');
var multer  = require('multer')

const shortid = require('shortid');
const authMiddleware = require('../middlewares/auth.middleware');
module.exports = router;

var upload = multer({ dest: './public/uploads/' })

router.get('/product', function(req, res){
  let page = parseInt(req.query.page) || 1;
  let perPage = 8;
  let start = (page-1) * perPage;
  let end = page * perPage;
  res.render('products/product.pug',{
    products: db.get('products').value().slice(start,end)
  });
});

// page = n, x items per page
// begin = (n-1) * x
// end = (n-1) * x + x = n*x
// items = arr.slice(begin, end)

router.get('/create',authMiddleware.requireAuth, function(req, res){
  res.render('products/create.pug');
});


router.post('/create', upload.single('img'), authMiddleware.requireAuth, function(req, res, next){
  req.body.id = shortid.generate();
  db.get('products').push(req.body).write();
  res.redirect(req.protocol + ':/products/product');
   //back to 
});