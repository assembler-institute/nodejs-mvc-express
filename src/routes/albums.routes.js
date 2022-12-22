const albumRouter = require('express').Router()
const albumsController = require('../controllers/albums.controller')

albumRouter
  .get('/', albumsController.getAllAlbums)
  .get('/:id', albumsController.getAlbumByID)
  .delete('/:id', albumsController.deleteAlbum)
  .patch('/:id', albumsController.updateAlbum)
  .post('/:id', albumsController.createAlbum)

module.exports = albumRouter
