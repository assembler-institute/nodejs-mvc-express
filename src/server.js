const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { json } = require('body-parser')
const cors = require('cors')

const albumsRoutes = require('./routes/albums.routes')
const authorRoutes = require('./routes/author.routes')
const userRoutes = require('./routes/user.routes')
const errorMiddleware = require('./middlewares/error.middleware')
const { checkJwt } = require('./middlewares/check-middleware')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use(cors(corsOptions))
app.use('/album', albumsRoutes)
app.use('/author', authorRoutes)
app.use('/user', checkJwt, userRoutes)
app.use(errorMiddleware)

module.exports = app
