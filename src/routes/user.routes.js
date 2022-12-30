const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')
// const { checkJwt } = require('../middlewares/check-middleware')

userRouter
  .post('/', userController.createUser)
  .get('/public', userController.publicPing)
  // .get('/private', checkJwt, userController.privatePing)
  .get('/private', userController.privatePing)
  .post('/:id', userController.updateUserImage)

module.exports = userRouter
