const express = require("express");
const router = express.Router();
const { isLogged } = require("../scripts/auth");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Αρχική σελίδα",
    text: "Πληροφορίες",
    isLogged: isLogged(req),
    username: req.session.username
  });
});

module.exports = router;
