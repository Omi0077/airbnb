// core modules
// const path = require('path')

// external mdoule
const express = require("express");
const userRouter = express.Router();

//local module
// const rootDir    = require('../utils/pathUtil');
const homeController = require('../controllers/homesController');

userRouter.get("/", homeController.getHomePage);

// userRouter.use(express.static(path.join(rootDir, 'public')))
// not needed


module.exports = userRouter;