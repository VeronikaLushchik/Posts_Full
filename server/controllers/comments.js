const Post = require('../models/posts')
const { updateComment } = require('../servecies/post')

commentPost = async (req, res) => {
    const { id } = req.params;
    const newComment = {...req.body, createAt: new Date(), userId: req.userId };
  
    const updatedPost = await updateComment(id, newComment)
  
    res.json(updatedPost);
  };
  
    module.exports = { commentPost }