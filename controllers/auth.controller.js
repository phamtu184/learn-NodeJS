var md5 = require('md5');
var User = require('../models/user.model');

module.exports.index = function(req, res){
  res.render('auth/login.pug');
}

module.exports.postAuth = async function(req, res){
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.findOne({email: email}, {password: password});
  if (!user){
    res.render('auth/login.pug',{
      errors : [
        'Khong ton tai nguoi dung'
      ],
      value: req.body
    });
    return;
  }
  let hashedPassword = md5(password);
  if (user._doc.password !== hashedPassword){
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
}