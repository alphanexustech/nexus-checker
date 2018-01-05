var express = require('express');
var router = express.Router();
var secrets = require('../config/secrets')
var jwt = require('jsonwebtoken');

/* GET Test 'Hello world'. */
router.get('/', function(req, res, next) {
  return res.send('Hello world!')
});

/* GET JWT Token and verify it. */
router.get('/verify', function(req, res, next) {
  var token = req.headers.authorization;
  token = token.split('Bearer ')[1];
  try {
    var decoded = jwt.verify(token, secrets.sessionSecret);
  } catch(err) {
    console.log(err);
    return res.sendStatus(401);
  }
  if (!decoded || decoded['iss'] != secrets.issuerSecret) {
    return res.sendStatus(401);
  } else {
    return res.send(decoded)
  }
});

/* POST User data to create JWT Token. */
router.post('/sign', function(req, res, next) {
  var payload = req.body;
  payload['iss'] = secrets.issuerSecret
  // Token with 1 hour expiration
  var token = jwt.sign(payload, secrets.sessionSecret, { expiresIn: '1h' });
  res.send(token);
});

module.exports = router;
