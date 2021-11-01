const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  name: String,
  email: String,
  body: String,
})

const postSchema = Schema({
  title: String,
  body: String,
  comments: { type: Schema.Types.Array, ref: 'Comment' },
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = mongoose.model('Post', postSchema)
