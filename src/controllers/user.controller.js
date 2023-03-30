const userModel = require('../models/user.model')

async function createUser (req, res, next) {
  const { firstName, email, password } = req.body

  try {
    const user = await userModel.create({
      firstName,
      email,
      password
    })
    res.status(200).send({ status: true, data: user })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

async function getAllUser (req, res, next) {
  try {
    const allUsers = await userModel.find({}).lean().exec()

    res.status(200).send({ status: true, data: allUsers })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

const getUserByID = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await userModel.findById(id).lean().exec()

    if (!user) {
      res.status(204).send({ status: true, data: 'Not found' })
    } else {
      res.status(200).send({ status: true, data: user })
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

module.exports = { createUser, getAllUser, getUserByID }
