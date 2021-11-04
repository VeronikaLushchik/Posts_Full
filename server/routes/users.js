const express = require('express')
const router = express.Router()

const { signin, signup } = require('../controllers/users')

router.post('/users/singin', singin)
router.post('/users/singup', singup);

module.exports = router