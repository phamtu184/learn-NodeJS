var db = require('../db')
module.exports.requireAuth = function(req, res, next){
  if(!req.signedCookies.userId){
    res.redirect(req.protocol + ':/auth');
    return;
  }
  var user = db.get('users').find({
    id: req.signedCookies.userId
    }).value();
  if (!user){
    res.redirect(req.protocol + ':/auth');
    return;
  }
  res.locals.user = user;
  next();
};