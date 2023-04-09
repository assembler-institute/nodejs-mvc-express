const admin = require('../firebaseConfig').admin

// Función middleware para verificar la autenticación del usuario
async function verifyAuth (req, res, next) {
  /* `const autorizacion = req.headers.authorization` is retrieving the value of the "Authorization"
  header from the incoming HTTP request and assigning it to a variable called "autorizacion". This
  header typically contains a token or other credentials that can be used to authenticate the user
  making the request. */
  const authorization = req.headers.authorization

  if (!authorization || !authorization.startsWith('Barear ')) {
    return res.status(401).send({ msg: 'Not authorized - Not token found' })
  }

  /* `const token = autorizacion.split('Bearer ')[1]` is splitting the authorization header value into
  an array using the string "Bearer " as the separator. The resulting array will have two elements,
  the first being "Bearer " and the second being the actual token. The `[1]` at the end of the
  expression is used to access the second element of the array, which is the token itself. This line
  of code is extracting the token from the authorization header value so that it can be used to
  verify the user's identity. */
  const token = authorization.substr(7)

  try {
    /* `const decodedToken = await admin.auth().verifyIdToken(token)` is verifying the authenticity of
    the user's ID token by decoding it. The `verifyIdToken()` method is provided by the Firebase
    Admin SDK and takes the user's ID token as an argument. If the token is authentic, the method
    returns an object containing information about the user, such as their user ID (`uid`) and email
    address (`email`). This information is then stored in the `decodedToken` variable for use in the
    middleware function. If the token is not authentic or has expired, an error is thrown and the
    user is not authorized to access the protected resource. */
    const decodedToken = await admin.auth().verifyIdToken(token)

    req.usuarioId = decodedToken.uid
    next()
  } catch (error) {
    // El token no es auténtico o ha expirado
    console.error('Error verifying token:', error)
    return res.status(401).send({ msg: 'Not authorized' })
  }
}

module.exports = verifyAuth
