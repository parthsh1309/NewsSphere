const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ path: "./config/.env" });

const User = require("./models/users");

const passport = require("passport");
const localStatergy = require("passport-local");

const secretkey = process.env.secret_key;
app.use(
  session({
    secret: secretkey,
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStatergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const homeRoute = require("./src/routes/home");
const loginRoute = require("./src/routes/auth/login"); 
const signupRoute = require("./src/routes/auth/signup"); 
const userPreferenceRoute = require("./src/routes/auth/userPreference");

app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/userPreference", userPreferenceRoute); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
