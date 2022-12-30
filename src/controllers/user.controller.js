const fs = require('fs-extra')
const userModel = require('../models/user.model')
const { cloudinary, uploadImage } = require('../utils/cloudinary')

async function createUser (req, res, next) {
  const { firstName, email, password, image } = req.body

  try {
    const user = await userModel.create({
      firstName,
      email,
      password,
      image
    })
    res.status(200).send({ status: true, data: user })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
async function publicPing (req, res, next) {
  res.status(200).send({ status: true, msg: 'Public Ping' })
}
async function privatePing (req, res, next) {
  console.log(req.body)
  res.status(200).send({ status: true, msg: 'Private Ping' })
}

async function updateUserImageWithBase64 (req, res, next) {
  const { image } = req.body
  const { id } = req.params
  try {
    if (image) {
      const imageUploaded = await cloudinary.uploader.upload(`data:image/png;base64,${image}`,
        { resource_type: 'image', folder: 'profilePictures/', overwrite: true })

      const updatedUser = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            image: {
              public_id: imageUploaded.public_id,
              secure_url: imageUploaded.secure_url
            }
          }
        },
        { new: true }
      ).lean().exec()

      res.status(200).send({ status: true, data: updatedUser })
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error })
  }
}
async function updateUserImageWithFileUpload (req, res, next) {
  const { id } = req.params

  try {
    if (req.files?.image) {
      const imageUploaded = await uploadImage(req.files.image.tempFilePath)
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            image: {
              public_id: imageUploaded.public_id,
              secure_url: imageUploaded.secure_url
            }
          }
        },
        { new: true }
      ).lean().exec()
      await fs.unlink(req.files.image.tempFilePath)
      res.status(200).send({ status: true, data: updatedUser })
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

module.exports = { createUser, publicPing, privatePing, updateUserImageWithBase64, updateUserImageWithFileUpload }
