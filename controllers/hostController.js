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
  const { homeName, location, price, rating, imageURL } = req.body;
  const home = new Home(homeName, location, price, rating, imageURL);
  home.save();
  // res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'))
  res.render("host/homeAdded", {
    pageTitle: "Home added",
    currPage: "addHomePage",
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.getAllHomes((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Your Homes",
      currPage: "hostHomeList",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  console.log(req.params);
  Home.findHome(req.params.homeID, (home) => {
    // console.log('lol', home.homeName);
    res.render("host/editHome", {
      home: home,
      pageTitle: "Edit Home",
      currPage: "editHomePage",
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const newHome = req.body;
  newHome.homeID = Number(newHome.homeID);
  // console.log(newHome);
  Home.updateHome(newHome, () => {
    res.redirect("/host/home-list");
  });
};

exports.postDeleteHome = (req, res, next)=>{
    Home.deleteHome(req.params.homeID, ()=>{
        res.redirect("/host/home-list");
    })
}
