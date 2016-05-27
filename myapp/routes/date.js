var express = require('express');
var router = express.Router();

/* GET the date */
router.get('/', function(req, res, next) {
  var utc = new Date().toJSON().slice(0,10);
  res.render('date', {date: utc});
});

module.exports = router;