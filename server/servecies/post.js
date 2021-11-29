const Post = require('../models/posts')

 module.exports.getPost = async (req, res, next) => {
    let post
    try {
      post = await Post.findById(req.params.id)
      if (!post) {
        return res.status(404).json({ message: 'Cannot find post' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.post = post
    next()
  }

  module.exports.createNewPost = (title, body, userId) => {
    const post = new Post({
      title,
      body,
      userId
    })
    return post.save()
  }

module.exports.updateComment = async (id, newComment) => {
  const post = await Post.findById(id);
  post.comments.push(newComment);

  const updatedPost = Post.findByIdAndUpdate(id, post, { new: true });

  return updatedPost

}

module.exports.paginatedResults = (model) => {
    return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const sort  = {}
    const { searchQuery } = req.query;
    const title = new RegExp(searchQuery, 'i');
    const count = await model.countDocuments().exec()

    const startIndex = (page - 1) * limit

    const results = {}

    results.numOfPages = Math.ceil(count/limit)

    if(req.query.OrderBy){
      sort.title = req.query.OrderBy
  }

    try {
      results.results = await model.find({title}).limit(limit).skip(startIndex).sort(sort).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
