const app = require('./server')
const config = require('./config/config')
const logger = require('log4js').getLogger()
const connect = require('./db/connect')

logger.level = 'debug'

connect().then(async function onServerInit () {
  logger.info('DB connected')

  app.listen(config.app.PORT, () => {
    logger.info(`⚙️ Server running at http:localhost:${config.app.PORT}`)
  })
})
