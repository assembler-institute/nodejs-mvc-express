const albumRouter = require('express').Router()
const authorController = require('../controllers/author.controller')

albumRouter
  .get('/', authorController.getAuthors)
  .get('/:id', authorController.getAuthorByID)
  .delete('/:id', authorController.deleteAuthor)
  .patch('/:id', authorController.updateAuthor)
  .post('/', authorController.createAuthor)

module.exports = albumRouter
