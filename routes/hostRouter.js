// core modules
const path = require('path')

// external mdoule
const express = require("express");
const hostRouter = express.Router();

//local module
const rootDir    = require('../utils/pathUtil')
const homeController = require('../controllers/homesController')


hostRouter.get("/add-home", homeController.getAddHome);
hostRouter.post("/add-home", homeController.postAddHome);

// hostRouter.use(express.static(path.join(rootDir, 'public')))
// not needed

module.exports = {
    hostRouter
}