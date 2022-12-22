const { Schema, model } = require('mongoose')

const AuthorSchema = Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'album'
  }]
})

const AuthorModel = model('author', AuthorSchema)

module.exports = AuthorModel
