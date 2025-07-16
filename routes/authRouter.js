const express = require('express')

// local modules
const authController = require('../controllers/authController')

const authRouter = express.Router()

authRouter.get('/login', authController.getLoginPage)
authRouter.post('/login', authController.postLoginPage)
authRouter.post('/logout', authController.postLogOut)
authRouter.get('/signup', authController.getSignupPage)
authRouter.post('/signup', authController.postSignupPage)

module.exports = authRouter