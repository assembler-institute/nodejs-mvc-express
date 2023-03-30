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
    }
  },
  production: {
    app: {
      PORT: process.env.PORT || 4002
    },
    db: {
      url: 'http://localhost:4002/albums'
    }
  }
}

module.exports = CONFIG[ENV]
