const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", {
    currPage: "logIn",
    pageTitle: "Log-In",
    isLoggedIn: false,
    oldInput: { email: "" },
    user: req.session.user,
  });
};

exports.postLoginPage = async (req, res, next) => {
  // res.cookie("isLoggedIn", true);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      currPage: "logIn",
      pageTitle: "Log-In",
      isLoggedIn: false,
      errors: ["Email not registered"],
      oldInput: { email },
      user: req.session.user,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      currPage: "logIn",
      pageTitle: "Log-In",
      isLoggedIn: false,
      errors: ["incorrect password"],
      oldInput: { email },
      user: req.session.user,
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
  console.log("Session on login:", req.session);
  console.log(req.body);
};

exports.postLogOut = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getSignupPage = (req, res, next) => {
  res.render("auth/signup", {
    currPage: "signup",
    pageTitle: "Sign-Up",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
    user: req.session.user,
  });
};

exports.postSignupPage = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be atleast 2 characters long.")
    .matches(/^[a-zA-z\s]+$/)
    .withMessage("First Name can only contain alphabets."),

  check("lastName")
    .matches(/^[a-zA-z\s]*$/)
    .withMessage("Last Name can only contain alphabets."),

  check("email")
    .isEmail()
    .withMessage("please enter a valid email.")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("password should be atleast 8 characters")
    .matches(/[A-Z]/)
    .withMessage("password should have atleast 1 uppercase")
    .matches(/[a-z]/)
    .withMessage("password should have atleast 1 lowercase")
    .matches(/[0-9]/)
    .withMessage("password should have atleast one number")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords dont match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("user type must be selected")
    .isIn(["guest", "host"])
    .withMessage("invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("kindly accept terms and conditions.")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("kindly accept terms and conditions.");
      }
      return true;
    }),

  (req, res, next) => {
    // console.log(req.body);
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        currPage: "signup",
        pageTitle: "Sign-Up",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
        user: req.session.user,
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("error while saving user", err);
        return res.status(422).render("auth/signup", {
          currPage: "signup",
          pageTitle: "Sign-Up",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, userType },
          user: req.session.user,
        });
      });
  },
];
