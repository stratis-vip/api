const checkUser = (uname, psswd) => {
  return uname === "admin" && psswd === "admin" ? true : false;
};

const login = (req, res, next) => {
  const { username, password } = req.body;
  if (req.body.username && checkUser(username, password)) {
    req.session.loggedIn = true;
    res.redirect("/");
  } else {
    res.render("login", { title: "Login Here", error: "Wrong credentials" });
  }
};

const logout = (req, res, next) => {
  req.session.loggedIn = false;
  res.redirect("/");
};

const checkLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.render("login", { title: "Login Here" });
  }
};

module.exports = {
  login: login,
  checkLoggedIn: checkLoggedIn,
  logout: logout
};
