const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../config/config').cloudinary

cloudinary.config(cloudinaryConfig)

module.exports = cloudinary
