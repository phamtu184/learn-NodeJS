var express = require('express');
var router = express();
var db = require('../db.js');
var md5 = require('md5');
// var controller = require('../controllers/user.controller');

module.exports = router;

router.get('/login', function(req, res){
  res.render('auth/login.pug');
});

router.post('/login', function(req, res){
  let email = req.body.email;
  let password = req.body.password;
  let user = db.get('users').find({email: email}).value();
  if (!user){
    res.render('auth/login.pug',{
      errors : [
        'Khong ton tai nguoi dung'
      ],
      value: req.body
    });
    return;
  }
  var hashedPassword = md5(password);
  if (user.password !== hashedPassword){
    res.render('auth/login.pug',{
      errors : [
        'Sai mat khau'
      ],
      value: req.body
    });
    return;
  }
  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect(req.protocol + ':/users');
})