var express = require('express');
var router = express();
var db = require('../db');

module.exports = router;

module.exports.addId = function(req, res){
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;
  if (!sessionId){
    res.redirect(req.protocol + ':/products/product');
    return;
  }

  var countCart = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, countCart + 1)
    .write();
  res.redirect(req.protocol + ':/products');
}

module.exports.index = function(req, res, next){
  res.render('products/cart.pug');
}

module.exports.postCart = function(req, res, next){
  let sessionId = req.signedCookies.sessionId;
  res.locals.countCart = db.get("sessions").find({ id: sessionId }).get("cart").size().value();
  Object.values(db.get("sessions").find({ id: sessionId }).get("cart").value());
}