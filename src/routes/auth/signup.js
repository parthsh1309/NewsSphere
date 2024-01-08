const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../../../models/users");

const { v4: uuidv4 } = require("uuid");


const userLoggedIn = require('../../../middleware/userLoggedIn');

router.get("/",userLoggedIn,(req, res) => {
  res.render("auth/signup");
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let terms = req.body.terms;
    if (terms) {
      terms = true;
    } else {
      terms = false;
    }
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      console.log(existingUser);
      return res.redirect("/login");
    }
    let saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      uuid: uuidv4(),
      name: name,
      email: email,
      canSendMail: terms,
      password: hashedPassword,
    });
    await user.save();
    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
      }else{
        console.log('the rew user',req.user) 
          console.log("User created successfully");
          res.redirect(`/userPreference/${req.user.uuid}`);
      }
    });
  } catch (error) {
      console.error(error);
  }
});

module.exports = router;
