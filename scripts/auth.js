const bcrypt = require("bcryptjs");

const checkUser = (uname, psswd) => {
  return uname === "admin" && psswd === "admin" ? true : false;
};

const login = (req, res, next) => {
  //console.log(`req.body = ${req.body}`)
  const { username, password } = req.body;
  if (req.body.username && checkUser(username, password)) {
    req.session.loggedIn = true;
    req.session.username = username
    res.redirect("/");
  } else {
    res.render("login", {
      title: "Σύνδεση",
      error: "Λάθος στοιχεία",
      isLogged: req.session.loggedIn,
      Ïlayout: "loginLayout"
    });
  }
};

const logout = (req, res, next) => {
  req.session.loggedIn = false;
  req.session.username = null
  res.redirect("/");
};

const checkLoggedIn = (req, res, next) => {
  // req.session.loggedIn = true
  if (req.session.loggedIn) {
    next();
  } else {
    res.render("login", {
      title: "Σύνδεση",
      isLogged: false,
      error: null,
      //layout: "loginLayout"
    });
  }
};

const crypt = p => {
  return bcrypt.hashSync(p, 10);
};

const isLogged = (rq) =>{
  return rq.session.loggedIn === undefined ? false : rq.session.loggedIn
}

module.exports = {
  login: login,
  checkLoggedIn: checkLoggedIn,
  logout: logout,
  crypt: crypt,
  isLogged: isLogged
};
