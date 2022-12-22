const dotenv = require('dotenv')
const logger = require('loglevel')

dotenv.config()

logger.enableAll()

const ENV = process.env.NODE_ENV || 'development'

const CONFIG = {
  development: {
    app: {
      PORT: process.env.PORT || 4001
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug
    },
    db: {
      uri: process.env.MONGODB_URI_CLUSTER
    }
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug
    },
    db: {
      url: 'http://localhost:4002/albums'
    }
  }
}

module.exports = CONFIG[ENV]
