const mongoose = require("mongoose");
mongoose.set("debug", true);
require('dotenv').config({path:'./.env'});

const databaseUrl = process.env.database_url

mongoose.connect(databaseUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });


module.exports = mongoose.connection;
