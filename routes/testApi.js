const express = require("express");
const router = express.Router();
const { isLogged } = require("../scripts/auth");

router.get("/", (req, res, next) => {
  res.render("api", {
    title: "Σελίδα του API",
    text: "Το Api λειτουργεί άψογα",
    isLogged: isLogged(req),
    username: req.session.username
  });
});

module.exports = router;
