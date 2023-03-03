const express = require('express');
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const checkRole= require('../middleware/check-role')

const { getAllUsers, getUsersById, createUser, updateUserById, deleteUserById } = require('../controllers/users')

// Get Users
router.get('/', checkAuth, checkRole(['admin','teacher']), getAllUsers)

// Get Users By ID
router.get('/:id', checkAuth,checkRole(['admin','teacher','student']), getUsersById)

// Create User
router.post('/', checkAuth,checkRole(['admin','teacher']), createUser)

// Update User
router.patch('/:id', checkAuth, checkRole(['admin','teacher']), updateUserById)

// Delete User
router.delete('/:id', checkAuth, checkRole(['admin','teacher']), deleteUserById)

module.exports = router