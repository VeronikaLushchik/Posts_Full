const Post = require('../models/posts')
const { createNewPost } = require('../servecies/post')

getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

getCurrentPost = (req, res) => {
  res.json(res.post)
}

createPost = async (req, res) => {
  const { title, body } = req.body
  try {
    const newPost = await createNewPost(title, body)
    res.status(201).json(newPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

updatingPost = async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title
  }
  if (req.body.body != null) {
    res.post.body = req.body.body
  }
  try {
    const updatedPost = await res.post.save()
    res.json(updatedPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

deletePost = async (req, res) => {
  try {
    await res.post.remove()
    res.json({ message: 'Deleted Post' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

  module.exports = { getAllPosts, getCurrentPost, createPost, updatingPost, deletePost }