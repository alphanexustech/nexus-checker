var express = require('express');
var router = express.Router();
var secrets = require('../config/secrets')
var express_jwt = require('express-jwt');

/* GET protected endpoint verifying admin authorization. */
router.get('/protected',
      express_jwt({secret: secrets.sessionSecret}),
      function(req, res) {
  if (!req.user.admin) {
    return res.sendStatus(401);
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
