const Post = require('../models/posts')

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
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  })
  try {
    const newPost = await post.save()
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

commentPost = async (req, res) => {
  const { id } = req.params;
  const newComment = req.body;

  const post = await Post.findById(id);

  post.comments.push(newComment);

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};

  module.exports = { getAllPosts, getCurrentPost, createPost, updatingPost, deletePost, commentPost }