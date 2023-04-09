const config = require('../config/config')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const checkJWT = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    })
  }

  try {
    /* `const { id } = jwt.verify(token, config.jwt.private_key)` is verifying the JWT token received
    in the request header by using the `jwt.verify()` method from the `jsonwebtoken` library. If the
    token is valid, it will decode the payload and extract the `id` property from it. The
    `config.jwt.private_key` is the private key used to sign the JWT token. The `id` extracted from
    the token is then used to find the corresponding user in the database. */
    const { id } = jwt.verify(token, config.jwt.private_key)
    console.log(id)

    const user = await UserModel.findById(id)

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user does not exist DB'
      })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no válido'
    })
  }
}

module.exports = checkJWT
