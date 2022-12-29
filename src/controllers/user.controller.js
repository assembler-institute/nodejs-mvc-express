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
async function publicPing (req, res, next) {
  res.status(200).send({ status: true, msg: 'Public Ping' })
}
async function privatePing (req, res, next) {
  res.status(200).send({ status: true, msg: 'Private Ping' })
}

module.exports = { createUser, publicPing, privatePing }
