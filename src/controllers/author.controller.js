const authorModel = require('../models/author.model')

const getAuthors = async (req, res, next) => {
  try {
    const allAuthors = await authorModel.find({}).lean().exec()

    res.status(200).send({ status: true, data: allAuthors })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

const createAuthor = async (req, res, next) => {
  const { name, age, genre } = req.body
  console.log(name, age, genre)
  try {
    const newAuthor = await authorModel.create({
      name,
      age,
      genre
    })

    res.status(201).send({ status: true, data: newAuthor._id })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
const getAuthorByID = async (req, res, next) => {
  const { id } = req.params
  try {
    const author = await authorModel.findById(id).populate('albums', {
      title: 1,
      genre: 1
      // _id: 0
    }).lean().exec()

    if (!author) {
      res.status(204).send({ status: true, data: 'Not found' })
    } else {
      res.status(200).send({ status: true, data: author })
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
const updateAuthor = async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body
  try {
    // const author = await authorModel.findOneAndUpdate(
    //   { _id: id },
    //   {
    //     $set: {
    //       name
    //     }
    //   },
    //   { new: true }
    // ).lean().exec()

    const author = await authorModel.findById({ _id: id })
    author.name = name
    await author.save()

    res.status(200).send({ status: true, data: author })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
const deleteAuthor = async (req, res, next) => {
  const { id } = req.params
  try {
    const author = await authorModel.findOneAndDelete({ _id: id })

    res.status(200).send({ status: true, data: author._id })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

module.exports = {
  getAuthors, createAuthor, getAuthorByID, updateAuthor, deleteAuthor
}
