const express = require('express');
const router = express.Router();
const { isLogged } = require("../scripts/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("user",{
    title:"Στοιχεία του μέλους " + req.session.username,
    text:  process.env.DB_USER || "Πληροφορίες",
    isLogged: isLogged(req),
    username: req.session.username
  });
 
});

module.exports = router;
