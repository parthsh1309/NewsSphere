const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../../../models/users");

const userLoggedIn = require('../../../middleware/userLoggedIn');

router.get("/",userLoggedIn,(req, res) => {
  res.render("auth/login");
});

router.post("/",async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).exec();

    if (user && bcrypt.compareSync(password, user.password)) {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    // Handle database query error
    res.redirect("/login");
  }
});

module.exports = router;
