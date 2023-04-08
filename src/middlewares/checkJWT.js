const config = require('../config/config')
const jwt = require('jsonwebtoken')

const checkJWT = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }

  try {
    const { id } = jwt.verify(token, config.jwt.private_key)
    console.log(id)

    // // leer el usuario que corresponde al uid
    // const usuario = await Usuario.findById( uid );

    // if( !usuario ) {
    //     return res.status(401).json({
    //         msg: 'Token no válido - usuario no existe DB'
    //     })
    // }

    // // Verificar si el uid tiene estado true
    // if ( !usuario.estado ) {
    //     return res.status(401).json({
    //         msg: 'Token no válido - usuario con estado: false'
    //     })
    // }

    // req.usuario = usuario
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no válido'
    })
  }
}

module.exports = checkJWT
