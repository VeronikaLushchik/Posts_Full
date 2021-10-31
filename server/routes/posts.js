const express = require('express')
const router = express.Router()
const { getPost } = require('../servecies/post')

const { getAllPosts, getCurrentPost, createPost, updatingPost, deletePost, commentPost } = require('../controllers/post')

router.get('/posts', getAllPosts) 
router.get('/posts/:id', getPost, getCurrentPost)
router.post('/posts', createPost)
router.patch('/posts/:id', getPost, updatingPost)
router.delete('/posts/:id', getPost, deletePost)
router.post('/posts/:id/commentPost', commentPost);

module.exports = router
