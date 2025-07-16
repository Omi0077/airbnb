//local modules
const Favourite = require("../models/favourites");
const House = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'addHome.html'))
  res.render("host/addHome", {
    pageTitle: "Add you home",
    currPage: "addHomePage",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, imageURL, description } =
    req.body;
  const home = new House({
    houseName,
    price,
    location,
    rating,
    imageURL,
    description,
  });
  home.save().then(() => {
    res.render("host/homeAdded", {
      pageTitle: "Home added",
      currPage: "addHomePage",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomeList = (req, res, next) => {
  House.find().then((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Your Homes",
      currPage: "hostHomeList",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getEditHome = (req, res, next) => {
  // console.log(req.params);
  House.findById(req.params._id).then((home) => {
    // console.log(home);
    res.render("host/editHome", {
      home: home,
      pageTitle: "Edit Home",
      currPage: "editHomePage",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const newHome = req.body;
  console.log(newHome);
  House.findByIdAndUpdate(newHome._id, {
    houseName: newHome.houseName,
    price: newHome.price,
    location: newHome.location,
    rating: newHome.rating,
    imageURL: newHome.imageURL,
    description: newHome.description,
  }).then(() => {
    res.redirect("/host/home-list");
  });
};

exports.postDeleteHome = (req, res, next) => {
  House.findByIdAndDelete(req.params._id)
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("error while deleting", err);
    });
};
