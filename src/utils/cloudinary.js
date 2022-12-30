const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../config/config').cloudinary

cloudinary.config(cloudinaryConfig)

const uploadImage = async (imagePath) => {
  const imageUploaded = await cloudinary.uploader.upload(imagePath,
    { resource_type: 'image', folder: 'profilePictures/', overwrite: true })
  return imageUploaded
}

module.exports = { cloudinary, uploadImage }
