const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.set('strictQuery', false)
function connect () {
  return mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = connect
