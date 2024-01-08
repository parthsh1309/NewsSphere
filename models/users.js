const mongoose = require("mongoose");
const database = require("../config/database");

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  password:  {
    type: String,
    required: true,
  },
  canSendMail: {
    type: Boolean,
    default: false,
  },
  newsCategory: {
    type: String,
    default: "",
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});


module.exports = mongoose.model("User", userSchema);
