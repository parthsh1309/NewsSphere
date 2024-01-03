const mongoose = require("mongoose");
const database = require("../config/database");

const passportLocalMongoose = require("passport-local-mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
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
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});


module.exports = mongoose.model("User", userSchema);
