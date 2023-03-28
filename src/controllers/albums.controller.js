const fs = require('fs')

const { albums } = require('../database/db.json')

const allAlbums = async (req, res, next) => {
  try {
    res.status(200).send({ status: 'OK', albums })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}

const singleAlbum = async (req, res, next) => {
  const { id } = req.params

  if (!id) res.status(400).send()

  const album = albums.find(album => album.id === Number(id))

  try {
    res.status(200).send({ status: 'OK', album })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}

const deleteAlbum = async (req, res, next) => {
  const { id } = req.params

  if (!id) res.status(400).send()

  const newAlbums = albums.filter(album => album.id !== Number(id))
  try {
    fs.writeFileSync('./src/database/db.json', JSON.stringify({ albums: newAlbums }))
    res.status(200).send({ status: 'OK', msg: `Deleted album with id ${id}` })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}
const updateAlbumArtist = async (req, res, next) => {
  const { id } = req.params
  const { artist } = req.body

  if (!id) res.status(400).send()

  try {
    let album = albums.find(album => album.id === Number(id))
    album = { ...album, artist }
    const newAlbums = [...albums.filter(album => album.id !== Number(id)), album]
    fs.writeFileSync('./src/database/db.json', JSON.stringify({ albums: newAlbums }))

    res.status(200).send({ status: 'OK' })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}
const createAlbum = async (req, res, next) => {
  const { name, imageUrl, artist } = req.body

  if (!name || !imageUrl || !artist) res.status(400).send()

  const newAlbum = {
    id: albums.length * 2,
    name,
    imageUrl,
    artist
  }

  const newAlbums = [...albums, newAlbum]

  try {
    fs.writeFileSync('./src/database/db.json', JSON.stringify({ albums: newAlbums }))
    res.status(201).send({ status: 'OK', newAlbum })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}

module.exports = {
  allAlbums,
  singleAlbum,
  deleteAlbum,
  updateAlbumArtist,
  createAlbum
}
