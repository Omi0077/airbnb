//local modules
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'addHome.html'))
  res.render("host/addHome", {
    pageTitle: "Add you home",
    currPage: "addHomePage",
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, imageURL, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    imageURL,
    description
  );
  home.save().then(() => {
    res.render("host/homeAdded", {
      pageTitle: "Home added",
      currPage: "addHomePage",
    });
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.getAllHomes().then((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Your Homes",
      currPage: "hostHomeList",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  // console.log(req.params);
  Home.findHome(req.params._id).then((home) => {
    // console.log(home);
    res.render("host/editHome", {
      home: home,
      pageTitle: "Edit Home",
      currPage: "editHomePage",
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const newHome = req.body;
  console.log(newHome);
  Home.updateHome(newHome).then(() => {
    res.redirect("/host/home-list");
  });
};

exports.postDeleteHome = (req, res, next) => {
  Home.deleteHome(req.params._id)
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("error while deleting", err);
    });
};
