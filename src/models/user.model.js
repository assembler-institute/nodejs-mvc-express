const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, 'The title is super required']
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    trim: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `The email ${props.value} is not valid`
    }
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
    minlength: [8, 'The password is too short']

  },
  image: {
    type: Object,
    required: [true, 'The image is required']
  }
})

UserSchema.pre('save', async function passwordPreSave (next) {
  try {
    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash
    return next()
  } catch (error) {
    return next(error)
  }
})

const UserModel = model('user', UserSchema)

module.exports = UserModel
