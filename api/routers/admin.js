const express = require('express');
const router = express.Router()
const checkAuth = require('../middleware/check-auth')


const { signUp, login, deleteAdmin } = require("../controllers/admin");


// Create Admin Result 
router.post('/signup', signUp)

router.post('/login', login)

router.delete('/:id',checkAuth, deleteAdmin)



module.exports = router