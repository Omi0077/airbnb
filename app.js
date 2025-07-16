// core module
const path = require("path");

// external mdoule
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session); // this wants to know session object

//local module
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDbStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });

app.use(express.urlencoded());

app.use(
  // express-session middleware
  session({
    secret: "om is king",
    resave: "false",
    saveUninitialized: true,
    store: store,
  })
);

app.use((req, res, next) => {
  // cookie checker middleware
  // console.log('cokkie check:', req.get('Cookie'));
  // const rawCookie = req.get("Cookie");
  // if (!rawCookie) {
  //   req.session.isLoggedIn = false;
  // }
  // const cookies = rawCookie.split("; ");
  // for (const cookie of cookies) {
  //   [key, value] = cookie.split("=");
  //   if (key == "isLoggedIn") {
  //     req.session.isLoggedIn = value === "true" ? true : false;
  //   }
  // }
  req.session.isLoggedIn = req.session.isLoggedIn; //this middleware aint doing nothin
  next();
});

app.use(userRouter);

app.use("/host", (req, res, next) => {
  // middleware to only let loggedin users to access host routes

  if (!req.session.isLoggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
});
app.use("/host", hostRouter);

app.use(authRouter);

app.use(express.static(path.join(rootDir, "public"))); // this makes public folder accessible but not directly
// this works despite being last cuz its in diff req

//404
app.use(errorController.get404);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to DB");
    app.listen(8000, () => {
      console.log("listening on port 8000");
    });
  })
  .catch((err) => {
    console.log("cant connect to DB: ", err);
  });
