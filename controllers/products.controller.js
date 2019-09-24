var express = require('express');
var router = express();
var db = require('../db.js');
const shortid = require('shortid');


module.exports = router;

module.exports.getPage = function(req, res){
  let page = parseInt(req.query.page) || 1;
  let perPage = 8;
  let start = (page-1) * perPage;
  let end = page * perPage;
  res.render('products/product.pug',{
    products: db.get('products').value().slice(start,end)
  });
}

module.exports.createProduct = function(req, res){
  res.render('products/create.pug');
}

module.exports.searchProduct = function(req, res){
  let q= req.query.q;
  let matchProducts = db.get('products').value().filter((product) => 
  product.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
  res.render('products/product', {
    products: matchProducts
  });
}

module.exports.postCreateProduct = function(req, res, next){
  req.body.id = shortid.generate();
  let imgStr = req.file.path.split('\\').slice(1).join('/');
  let docStr = "../";
  req.body.img = docStr.concat(imgStr);
  req.body.price = parseInt(req.body.price);

  db.get('products').push(req.body).write();
  res.redirect(req.protocol + ':/products');
   //back to 
}