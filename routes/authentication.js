var express = require('express');
var router = express.Router();
var secrets = require('../config/secrets')
var jwt = require('jsonwebtoken');

/* GET JWT Token. */
router.get('/verify', function(req, res, next) {
  var token = req.headers.authorization;
  token = token.split('Bearer ')[1];
  try {
    var decoded = jwt.verify(token, secrets.sessionSecret);
  } catch(err) {
    console.log(err);
    return res.sendStatus(401);
  }
  if (!decoded || decoded['authenticationSource'] != 'N-Checker') {
    return res.sendStatus(401);
  } else {
    return res.send(decoded)
    // return res.sendStatus(200);
  }
});

/* POST User data to create JWT Token. */
router.post('/sign', function(req, res, next) {
  var payload = req.body;
  payload['authenticationSource'] = 'N-Checker'
  // Token with 1 hour expiration
  var token = jwt.sign(payload, secrets.sessionSecret, { expiresIn: '1h' });
  res.send(token);
});

module.exports = router;
