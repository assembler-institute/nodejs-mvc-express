const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')
const { checkJwt } = require('../middlewares/check-middleware')

userRouter
  .post('/', userController.createUser)
  .get('/public', userController.publicPing)
  .get('/private', checkJwt, userController.privatePing)
  .post('/auth', userController.authentication)

module.exports = userRouter
