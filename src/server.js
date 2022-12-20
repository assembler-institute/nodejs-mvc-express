const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { json } = require('body-parser')
const albumsRoutes = require('./routes/albums.routes')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use('/albums', albumsRoutes)

module.exports = app
