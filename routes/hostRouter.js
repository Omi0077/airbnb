// core modules
const path = require('path')

// external mdoule
const express = require("express");
const hostRouter = express.Router();

//local module
const rootDir    = require('../utils/pathUtil')
const hostController = require('../controllers/hostController')


hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/home-list", hostController.getHostHomeList);
hostRouter.get("/edit-home/:_id", hostController.getEditHome);
hostRouter.post("/edit-home", hostController.postEditHome);
hostRouter.post("/delete-home/:_id", hostController.postDeleteHome);

// hostRouter.use(express.static(path.join(rootDir, 'public')))
// not needed

module.exports = {
    hostRouter
}