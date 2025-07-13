const Favourite = require("../models/favourites");
const Home = require("../models/home");

exports.getHomePage = (req, res, next) => {
  Home.getAllHomes().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currPage: "homePage",
    });
  });
};

exports.getBookingsPage = (req, res, next) => {
  Home.getAllHomes().then((registeredHomes) => {
    res.render("store/bookings", {
      registeredHomes: registeredHomes,
      pageTitle: "Your Bookings",
      currPage: "bookings",
    });
  });
};

exports.getFavPage = (req, res, next) => {
  async function gettingFavHomes() {
    const favIDs = await Favourite.getFavourites();
    const favHomes = await Promise.all(
      favIDs.map((favID) => Home.findHome(favID.houseID))
    );
    if (favHomes) {
      res.render("store/favList", {
        favHomeList: favHomes,
        pageTitle: "favouites",
        currPage: "favList",
      });
    }
  }
  gettingFavHomes();
};

exports.getListPage = (req, res, next) => {
  Home.getAllHomes().then((registeredHomes) => {
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "All Homes",
      currPage: "homeList",
    });
  });
};

exports.getHomeDetailPage = (req, res, next) => {
  const _id = req.params._id;
  Home.findHome(_id).then((home) => {
    if (!home) {
      res.redirect("/");
      console.log("home not found in db");
    } else {
      res.render("store/homeDetail", {
        home: home,
        pageTitle: "Details",
        currPage: "homePage",
      });
    }
  });
};

exports.postFavPage = (req, res, next) => {
  const favid = req.body._id;
  // console.log(favid);
  const favHome = new Favourite(favid);
  favHome
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
};

exports.postDeleteFromFav = (req, res, next) => {
  Favourite.deleteFavourite(req.params._id)
    .then((result) => {
      console.log("fav removed", result);
    })
    .catch((err) => {
      console.log("error while removing fav", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
