const jwt = require('jsonwebtoken')

const config = require('../config/config')

const generateJWT = (id = '') => {
  return new Promise((resolve, reject) => {
    const payload = { id }

    jwt.sign(payload, config.jwt.private_key, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = generateJWT
