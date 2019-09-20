var express = require('express');
var router = express();
var db = require('../db.js');
const shortid = require('shortid');
const authMiddleware = require('../middlewares/auth.middleware');
// var controller = require('../controllers/user.controller');

module.exports = router;

router.get('/', authMiddleware.requireAuth, function(req, res){
  res.render('users/tien.pug', {
    users: db.get('users').value()
  });
});

router.get('/search',authMiddleware.requireAuth, function(req, res){
  let q= req.query.q;
  let matchUsers = db.get('users').value().filter((user) => 
  user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
  res.render('users/tien', {
    users: matchUsers
  });
});


router.get('/:id',authMiddleware.requireAuth, function(req, res){
  let id = req.params.id;
  let user = db.get('users').find({id: id}).value();
  res.render('users/view', {
    user: user
  });
});

router.post('/tien',authMiddleware.requireAuth, function(req, res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect(req.protocol + ':/users');
   //back to 
});


