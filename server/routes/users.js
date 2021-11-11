const express = require('express')
const router = express.Router()

const {singin, singup, refresh} = require('../controllers/users')

router.post('/users/singin', singin)
router.post('/users/singup', singup);
router.get('/users/refresh', refresh);

module.exports = router