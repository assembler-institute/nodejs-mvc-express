const fetch = require('node-fetch-commonjs');
const config = require('../config/config');

const getAllBooks = async () => {
  try {
    const response = await fetch(`${config.db.url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { ErrorMsg: error };
  }
};

const getAlbumById = async (id) => {
  try {
    const response = await fetch(`${config.db.url}/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { ErrorMsg: error };
  }
};

const deleteAlbumById = async (id) => {
  try {
    const response = await fetch(`${config.db.url}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { ErrorMsg: error };
  }
};
const updateAlbumById = async (id, body) => {
  try {
    const response = await fetch(`${config.db.url}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { ErrorMsg: error };
  }
};
const createAlbum = async (body) => {
  try {
    const response = await fetch(`${config.db.url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { ErrorMsg: error };
  }
};

module.exports = {
  getAllBooks,
  getAlbumById,
  deleteAlbumById,
  updateAlbumById,
  createAlbum,
};
