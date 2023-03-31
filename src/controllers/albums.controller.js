const albumModel = require('../models/album.model')
const authorModel = require('../models/author.model')

const getAllAlbums = async (req, res, next) => {
  console.log('All Albums')
  try {
    const allAlbums = await albumModel.find({}).lean().exec()

    res.status(200).send({ status: true, data: allAlbums })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

const createAlbum = async (req, res, next) => {
  const { id } = req.params
  const { title, yearReleased, genre } = req.body

  try {
    const newAlbum = await albumModel.create({
      title,
      yearReleased,
      genre
    })

    if (id) {
      await authorModel
        .updateOne(
          { _id: id },
          { $push: { albums: newAlbum._id } }
        )
    }

    res.status(201).send({ status: true, data: newAlbum._id })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
const getAlbumByID = async (req, res, next) => {
  const { id } = req.params

  if (!id) res.status(400).send()

  try {
    const album = await albumModel.findById(id).lean().exec()

    res.status(200).send({ status: true, data: album })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
const updateAlbumArtist = async (req, res, next) => {
  const { id } = req.params
  const { ...fields } = req.body

  try {
    const author = await albumModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...fields
        }
      },
      { new: true }
    ).lean().exec()

    res.status(200).send({ status: true, data: author })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
const deleteAlbum = async (req, res, next) => {
  const { id } = req.params
  try {
    const album = await albumModel.findOneAndDelete({ _id: id })

    if (!album) res.status(404).send({ message: 'Album not found' })

    const authors = await authorModel.find({ albums: id })

    authors.forEach(async author => {
      author.albums = author.albums.filter(album => album.toString() !== id)
      await author.save()
    })

    res.status(200).send({ status: true })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

module.exports = {
  getAllAlbums, createAlbum, getAlbumByID, deleteAlbum, updateAlbumArtist
}
