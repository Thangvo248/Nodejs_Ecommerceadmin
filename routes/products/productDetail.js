var express = require('express');
var router = express.Router();

/* GET shop page. */
router.get('/', function(req, res, next) {
  res.render('admin/productsDetail', { title: 'Express' });
});

module.exports = router;
