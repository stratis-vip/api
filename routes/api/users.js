const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { isLogged } = require("../../scripts/auth");

/* GET users. */
router.get("/", function(req, res, next) {
  let users = new User();
  users.getAllUsers().then(usersData => res.json(usersData));
});

/*CREATE user */
router.post("/", function(req, res, next) {
  const { name, email, password } = req.body;
  let user = new User(name, email, password);
  user.save().then(createdData => res.json(createdData));
});

/* GET user With id*/
router.get("/:id", (req, res, next) => {
  let user = new User();
  user.getUserById(req.params.id).then(userData => res.json(userData));
});

/*UPDATE user with id*/
router.post("/:id", (req, res, next) => {
  let user = new User();
  const id = req.params.id;
  const { name, email } = req.body;
  user.update(id, name, email).then(updateData => res.json(updateData));
});

/*DELETE user with id */
router.delete("/:id", (req, res) => {
  let user = new User();
  const id = req.params.id;
  user.deleteUserById(id).then(deletedData => res.json(deletedData));
});

module.exports = router;
