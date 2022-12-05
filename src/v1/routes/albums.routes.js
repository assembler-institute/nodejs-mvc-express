const express = require('express');
const albumsController = require('../../controllers/albums.controller');
const router = express.Router();

router
  .get('/', albumsController.allAlbums)
  .get('/:id', albumsController.singleAlbum)
  .delete('/:id', albumsController.deleteAlbum)
  .patch('/:id', albumsController.updateAlbum)
  .post('/', albumsController.createAlbum);

module.exports = router;
