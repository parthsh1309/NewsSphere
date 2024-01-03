function userLoggedIn(req, res, next) {
  // delete req.session.returnTo
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = userLoggedIn;
