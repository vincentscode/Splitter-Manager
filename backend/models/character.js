const mongoose = require('mongoose')
const User = require("./user")

const CharacterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  data: {
    type: String,
    required: true,
  }
})

const Character = mongoose.model('Character', CharacterSchema)

module.exports = exports = Character
