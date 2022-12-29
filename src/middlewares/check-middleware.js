const { auth0 } = require('../config/config')
const { expressjwt: jwt } = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0.issuer}.well-known/jwks.json`
  }),

  audience: auth0.audience,
  issuer: auth0.issuer,
  algorithms: ['RS256']
})

const checkAuth0Token = async (req, res, next) => {
  const isAuthorized = await checkJwt(req, res, next)
  console.log(isAuthorized)
  if (isAuthorized) {
    next()
  }
  res.status(401).send({ ok: false, msg: 'Not authorized' })
}

module.exports = {
  checkJwt, checkAuth0Token
}
