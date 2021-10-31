const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: {
    type: [{
    name: String,
    email: String,
    body: String
  }], 
  default: [] },
})

module.exports = mongoose.model('Post', postSchema)