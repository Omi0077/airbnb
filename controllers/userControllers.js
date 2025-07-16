const Favourite = require("../models/favourites");
const Home = require("../models/home");
const User = require("../models/user");

exports.getHomePage = (req, res, next) => {
  // console.log('seesion: ',req.session.isLoggedIn);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currPage: "homePage",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookingsPage = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/bookings", {
      registeredHomes: registeredHomes,
      pageTitle: "Your Bookings",
      currPage: "bookings",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getFavPage = (req, res, next) => {
  // async function gettingFavHomes() {
  //   const favIDs = await Favourite.find();
  //   const favHomes = await Promise.all(
  //     favIDs.map((favID) => Home.findById(favID.houseID.toString()))
  //   );
  //   if (favHomes) {
  //     res.render("store/favList", {
  //       favHomeList: favHomes,
  //       pageTitle: "favouites",
  //       currPage: "favList",
  //     });
  //   }
  // }
  // gettingFavHomes();
  User.findById(req.session.user._id)
    .populate("favourites")
    .then((user) => user.favourites)
    .then((favHomes) => {
      if (favHomes) {
        res.render("store/favList", {
          favHomeList: favHomes,
          pageTitle: "favouites",
          currPage: "favList",
          isLoggedIn: req.session.isLoggedIn,
          user: req.session.user,
        });
      }
    });

  // Favourite.find()
  //   .populate("houseID") // populate puts actual house object inside houseID
  //   .then((favs) => {
  //     // console.log(favs);
  //     const favHomes = favs.map((fav) => fav.houseID);
  //     if (favHomes) {
  //       res.render("store/favList", {
  //         favHomeList: favHomes,
  //         pageTitle: "favouites",
  //         currPage: "favList",
  //         isLoggedIn: req.session.isLoggedIn,
  //         user: req.session.user,
  //       });
  //     }
  //   });
};

exports.getListPage = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "All Homes",
      currPage: "homeList",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomeDetailPage = (req, res, next) => {
  const _id = req.params._id;
  Home.findById(_id).then((home) => {
    if (!home) {
      res.redirect("/");
      console.log("home not found in db");
    } else {
      res.render("store/homeDetail", {
        home: home,
        pageTitle: "Details",
        currPage: "homePage",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.postFavPage = (req, res, next) => {
  const houseID = req.body._id;
  // console.log(favid);

  User.findById(req.session.user._id).then((user) => {
    const exists = user.favourites.some((fav) => fav.toString() === houseID);
    if (exists) {
      console.log("already fav");
      return res.redirect("/favourites");
    } else {
      user.favourites.push(houseID);
      return user
        .save()
        .then((result) => {
          console.log("added to fav", result);
        })
        .catch((err) => {
          console.log("error while adding to fav", err);
        })
        .finally(() => {
          res.redirect("/favourites");
        });
    }
  });

  // Favourite.findOne({ houseID: houseID }).then((existingFav) => {
  //   if (existingFav) {
  //     console.log("already fav");
  //     return res.redirect("/favourites");
  //   } else {
  //     const favHome = new Favourite({ houseID });
  //     favHome
  //       .save()
  //       .then((result) => {
  //         console.log("added to fav", result);
  //       })
  //       .catch((err) => {
  //         console.log("error while adding to fav", err);
  //       })
  //       .finally(() => {
  //         res.redirect("/favourites");
  //       });
  //   }
  // });
};

exports.postDeleteFromFav = (req, res, next) => {
  User.findById(req.session.user._id)
    .then((user) => {
      user.favourites = user.favourites.filter(
        (fav) => fav.toString() !== req.params._id
      );
      return user.save();
    })
    .then((result) => {
      console.log("fav removed", result);
    })
    .catch((err) => {
      console.log("error while removing fav", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });

  // Favourite.deleteOne({ houseID: req.params._id })
  //   .then((result) => {
  //     console.log("fav removed", result);
  //   })
  //   .catch((err) => {
  //     console.log("error while removing fav", err);
  //   })
  //   .finally(() => {
  //     res.redirect("/favourites");
  //   });
};
