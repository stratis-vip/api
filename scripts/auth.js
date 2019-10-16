const bcrypt = require('bcryptjs')

const checkUser = (uname, psswd) => {
  return uname === "admin" && psswd === "admin" ? true : false;
};

const login = (req, res, next) => {
  //console.log(`req.body = ${req.body}`)
  const { username, password } = req.body;
  if (req.body.username && checkUser(username, password)) {
    req.session.loggedIn = true;
    res.redirect('/')
  } else {
    res.render("login", { title: "Σύνδεση", error: "Λάθος στοιχεία" , layout:'loginLayout'});
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
    res.render('login', {title: 'Σύνδεση', error: null, layout:'loginLayout'})
  }
};

const crypt =(p) =>{
    return bcrypt.hashSync(p,10)
}
module.exports = {
  login: login,
  checkLoggedIn: checkLoggedIn,
  logout: logout,
  crypt: crypt
};
