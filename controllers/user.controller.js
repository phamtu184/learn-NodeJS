var db = require('../db.js');
const shortid = require('shortid');
var User = require('../models/user.model');

module.exports.index = function(req, res){
  User.find().then(function(users){
    res.render('users/tien.pug', {
      users: users
    });
  })
}

module.exports.searchUser = function(req, res){
  let q= req.query.q;
  let matchUsers = db.get('users').value().filter((user) => 
  user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
  res.render('users/tien', {
    users: matchUsers
  });
}

module.exports.getUser = function(req, res){
  let id = req.params.id;
  let user = db.get('users').find({id: id}).value();
  res.render('users/view', {
    user: user
  });
}

module.exports.postUser = function(req, res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect(req.protocol + ':/users');
   //back to 
}