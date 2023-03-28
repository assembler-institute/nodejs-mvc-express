const app = require('./server')
const config = require('./config/config')
const logger = require('log4js').getLogger()

logger.level = 'debug'

app.listen(config.app.PORT, () => {
  logger.info(`⚙️ Server running at http:localhost:${config.app.PORT}`)
})
