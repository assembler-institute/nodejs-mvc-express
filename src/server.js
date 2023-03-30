const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { json } = require('body-parser')
const albumRouter = require('./routes/albums.routes')
const authorRoutes = require('./routes/author.routes')
const userRoutes = require('./routes/user.routes')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use('/albums', albumRouter)
app.use('/author', authorRoutes)
app.use('/user', userRoutes)

module.exports = app
