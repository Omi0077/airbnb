// core module
const path = require("path");

// external mdoule
const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose')

//local module
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController");
const {mongoConnect} = require("./utils/dataBaseUtil");
// const db = require('./utils/dataBaseUtil');

// db.execute("SELECT * FROM homes")
// .then(([rows, fields]) =>{
//   console.log('getting from db', rows);
// })
// .catch(err=>{
//   console.log('error while getting from db:', err);
// })

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public"))); // this makes public folder accessible but not directly
// this works despite being last cuz its in diff req

//404
app.use(errorController.get404);

// mongoose.connect()

mongoConnect(() => {
  app.listen(8000, () => {
    console.log(`listening on port 8000`);
  });
});
