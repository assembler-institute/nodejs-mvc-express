const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { json } = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const albumsRoutes = require('./routes/albums.routes')
const authorRoutes = require('./routes/author.routes')
const userRoutes = require('./routes/user.routes')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(morgan('dev'))
app.use(helmet())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
    limits: { fileSize: 10000000 }, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
  })
)
app.use(json({ limit: '50mb' }))
app.use(cors(corsOptions))
app.use('/album', albumsRoutes)
app.use('/author', authorRoutes)
app.use('/user', userRoutes)
app.use(errorMiddleware)

module.exports = app
