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

module.exports = { createUser }
