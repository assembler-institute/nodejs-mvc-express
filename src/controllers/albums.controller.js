const albumsService = require('../services/albums.services');

const allAlbums = async (req, res, next) => {
  const response = await albumsService.getAllBooks();
  if (response.ErrorMsg) {
    res.status(502).send({ status: 'FALSE' });
  }
  res.status(200).send({ status: 'OK', data: response });
};

const singleAlbum = async (req, res, next) => {
  const { id } = req.params;
  const response = await albumsService.getAlbumById(id);
  if (response.ErrorMsg) {
    res.status(502).send({ status: 'FALSE' });
  }

  res.status(200).send({ status: 'OK', data: response });
};

const deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  const response = await albumsService.deleteAlbumById(id);
  if (response.ErrorMsg) {
    res.status(502).send({ status: 'FALSE' });
  }

  res.status(200).send({ status: 'OK' });
};
const updateAlbum = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const response = await albumsService.updateAlbumById(id, body);

  if (response.ErrorMsg) {
    res.status(502).send({ status: 'FALSE' });
  }

  res.status(200).send({ status: 'OK', data: response });
};
const createAlbum = async (req, res, next) => {
  const body = req.body;
  const response = await albumsService.createAlbum(body);
  if (response.ErrorMsg) {
    res.status(502).send({ status: 'FALSE' });
  }

  res.status(201).send({ status: 'OK' });
};

module.exports = {
  allAlbums,
  singleAlbum,
  deleteAlbum,
  updateAlbum,
  createAlbum,
};
