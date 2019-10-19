const express = require("express");
const router = express.Router();
const usersApi = require("./api/users");
const { checkLoggedIn } = require("../scripts/auth");
const { isLogged } = require("../scripts/auth");

router.use("/users", checkLoggedIn, usersApi);
router.get("/", (req, res, next) => {
  res.render("api", {
    title: "Οδηγίες χρήσης API Διακομιστή Προπονήσεων",
    isLogged: isLogged(req),
    username: req.session.username,
    version: "1.0"
  });
});

module.exports = router;
