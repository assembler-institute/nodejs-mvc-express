const generateJWT = require('../helpers/generateJWT')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

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
  res.status(200).send({ status: true, msg: 'Public Ping from Server' })
}
async function privatePing (req, res, next) {
  res.status(200).send({ status: true, msg: 'Private Ping from Server' })
}

async function authentication (req, res, next) {
  const { email, pass } = req.body
  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(401).send({ status: true, msg: 'Unauthorized' })
    }

    const match = await bcrypt.compareSync(pass, user.password)

    if (!match) {
      return res.status(401).send({ status: true, msg: 'Authenticaction Incorrect' })
    }

    const token = await generateJWT(user._id)

    res.status(200).send({ status: true, data: { token, user } })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

module.exports = { createUser, publicPing, privatePing, authentication }
