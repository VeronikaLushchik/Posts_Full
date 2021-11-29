const Post = require('../models/posts')
const { createNewPost } = require('../servecies/post')

getAllPosts = (req, res, next) => {
  try {
    res.json(res.paginatedResults)
  } catch (err) {
    next(err)
  }
}

getCurrentPost = (req, res) => {
  
  res.json(res.post)
}

createPost = async (req, res, next) => {
  const { title, body } = req.body
  try {
    const newPost = await createNewPost(title, body, req.userId)
    res.status(201).json(newPost)
  } catch (err) {
    next(err)
  }
}

updatingPost = async (req, res, next) => {
  if (req.body.title) {
    res.post.title = req.body.title
  }
  if (req.body.body) {
    res.post.body = req.body.body
  }
  try {
    const updatedPost = await res.post.save()
    res.json(updatedPost)
  } catch (err) {
      next(err)
  }
}

deletePost = async (req, res, next) => {
  try {
    await res.post.remove()
    res.json({ message: 'Deleted Post' })
  } catch (err) {
     next(err)
  }
}

  module.exports = { getAllPosts, getCurrentPost, createPost, updatingPost, deletePost }