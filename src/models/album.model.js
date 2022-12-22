const { Schema, model } = require('mongoose')

const AlbumSchema = Schema({
  title: {
    type: String,
    required: [true, 'The title is super required']
  },
  yearReleased: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  }
})

const AlbumModel = model('album', AlbumSchema)

module.exports = AlbumModel
