// core modules
// const path = require('path')

// external mdoule
const express = require("express");
const userRouter = express.Router();

//local module
// const rootDir    = require('../utils/pathUtil');
const userController = require('../controllers/userControllers');

userRouter.get("/", userController.getHomePage);
userRouter.get("/bookings", userController.getBookingsPage);
userRouter.get("/favourites", userController.getFavPage);
userRouter.get("/list", userController.getListPage);
userRouter.get("/home-detail/:_id", userController.getHomeDetailPage);
userRouter.post("/favourites", userController.postFavPage);
userRouter.post("/favourites/delete/:_id", userController.postDeleteFromFav);


// userRouter.use(express.static(path.join(rootDir, 'public')))
// not needed


module.exports = userRouter;