const express = require('express')
const router = express.Router()
const upload = require('../servecies/user')

const {singin, singup, refresh} = require('../controllers/users')

router.post('/users/singin', singin)
router.post('/users/singup', upload.single('photo'), singup);
router.get('/users/refresh', refresh);

module.exports = router