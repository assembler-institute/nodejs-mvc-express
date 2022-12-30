const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')
// const { checkJwt } = require('../middlewares/check-middleware')

userRouter
  .post('/', userController.createUser)
  .get('/public', userController.publicPing)
  // .get('/private', checkJwt, userController.privatePing)
  .get('/private', userController.privatePing)
  .patch('/:id', userController.updateUserImageWithBase64)
  .patch('/upload/:id', userController.updateUserImageWithFileUpload)

module.exports = userRouter
