const express = require('express')
const albumsController = require('../controllers/albums.controller')
const { checkParam, doubleCheckParam } = require('../middlewares/check-middleware')
const router = express.Router()

router
  .get('/', albumsController.allAlbums)
  .get('/:id', checkParam, doubleCheckParam, albumsController.singleAlbum)
  .delete('/:id', checkParam, doubleCheckParam, albumsController.deleteAlbum)
  .patch('/:id', checkParam, doubleCheckParam, albumsController.updateAlbum)
  .post('/', albumsController.createAlbum)

module.exports = router
