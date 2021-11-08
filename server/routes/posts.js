const express = require('express')
const router = express.Router()
const { getPost } = require('../servecies/post')
const { auth } = require('../middleware/auth')

const { getAllPosts, getCurrentPost, createPost, updatingPost, deletePost } = require('../controllers/post')
const { commentPost } = require('../controllers/comments')

router.get('/posts', getAllPosts) 
router.get('/posts/:id', getPost, getCurrentPost)
router.post('/posts', auth, createPost)
router.patch('/posts/:id', auth, getPost, updatingPost)
router.delete('/posts/:id', auth, getPost, deletePost)
router.post('/posts/:id/commentPost', auth, commentPost);

module.exports = router
