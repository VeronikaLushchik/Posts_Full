const Post = require('../models/posts')

 module.exports.getPost = async (req, res, next) => {
    let post
    try {
      post = await Post.findById(req.params.id)
      if (post == null) {
        return res.status(404).json({ message: 'Cannot find post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  6
    res.post = post
    next()
  }

  module.exports.createNewPost = (title, body) => {
    const post = new Post({
      title,
      body,
    })
    return post.save()
  }

module.exports.updateComment = async (id, newComment) => {
  const post = await Post.findById(id);
  post.comments.push(newComment);

  const updatedPost = Post.findByIdAndUpdate(id, post, { new: true });

  return updatedPost

}