const express = require('express');
const router = express.Router();
const {isLogged} = require('../scripts/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("about", {
    title: "Σχετικά με...",
    text: "Πληροφορίες", 
    isLogged: isLogged(req), 
    username: req.session.username
    });
});

module.exports = router;
