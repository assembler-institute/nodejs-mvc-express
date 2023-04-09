const albumRouter = require('express').Router()
const albumsController = require('../controllers/albums.controller')
const verifyAuth = require('../middlewares/checkFirebaseToken')

albumRouter
  .get('/', verifyAuth, albumsController.getAllAlbums)
  .get('/:id', albumsController.getAlbumByID)
  .delete('/:id', albumsController.deleteAlbum)
  .patch('/:id', albumsController.updateAlbum)
  .post('/:id', albumsController.createAlbum)

module.exports = albumRouter
