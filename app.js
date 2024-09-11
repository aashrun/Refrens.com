const express = require("express");
require('dotenv').config()
const routes = require("./Routes/route")
const app = express();
const mongoose = require('mongoose')

app.use(express.json());

mongoose.connect(
    process.env.mongoDB,
   )  
   .then(() => console.log("MongoDB is connected."))
   .catch( err => console.log(err));

app.use("/refrens", routes)

app.listen(process.env.PORT || 2802, function () {
  console.log("Express app running on port " + (process.env.PORT || 2802));
});


