const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' })
} else {
  dotenv.config({ path: '.env.development' })
}

const ENV = process.env.NODE_ENV || 'development'

const CONFIG = {
  development: {
    app: {
      PORT: process.env.PORT || 4001
    },
    db: {
      uri: process.env.MONGODB_URI_CLUSTER
    },
    auth0: {
      client_origin: process.env.APP_ORIGIN,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER
    },
    jwt: {
      private_key: process.env.JWT_SECRET
    }
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001
    },
    db: {
      url: 'http://localhost:4002/albums'
    },
    jwt: {
      private_key: process.env.JWT_SECRET
    }
  }
}

module.exports = CONFIG[ENV]
