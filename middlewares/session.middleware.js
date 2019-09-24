const shortid = require('shortid');
var db = require('../db.js');

module.exports = function(req, res, next){
  if (!req.signedCookies.sessionId){
    let sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    db.get('sessions').push({
      id: sessionId
    }).write();
  }
  next();
}