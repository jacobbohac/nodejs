var express = require('express');
var router = express.Router();

/* GET database page. */
router.get('/', function (req, res) {
    res.render('jade_example', { title: 'Jade' });
});

module.exports = router;