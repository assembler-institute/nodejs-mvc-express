const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')

userRouter
  .post('/', userController.createUser)
  .get('/', userController.getAllUser)
  .get('/:id', userController.getUserByID)

module.exports = userRouter
