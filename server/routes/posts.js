const express = require('express')
const router = express.Router()
const { getPost } = require('../servecies/post')
const { auth } = require('../middleware/auth')
const Post = require('../models/posts')
const { paginatedResults } = require('../servecies/post')
const { getAllPosts, getCurrentPost, createPost, updatingPost, deletePost } = require('../controllers/post')
const { commentPost } = require('../controllers/comments')

router.use(auth)
router.get('/posts', paginatedResults(Post), getAllPosts) 
router.get('/posts/:id', getPost, getCurrentPost)
router.post('/posts', createPost)
router.patch('/posts/:id', getPost, updatingPost)
router.delete('/posts/:id',getPost, deletePost)
router.post('/posts/:id/commentPost', commentPost);

module.exports = router
