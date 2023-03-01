const express = require('express');
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const { login } = require("../controllers/login");

router.post('/login', login)

module.exports = router