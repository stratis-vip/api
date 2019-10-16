const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('about', {text: 'Sxetik;a me'});
});

module.exports = router;
