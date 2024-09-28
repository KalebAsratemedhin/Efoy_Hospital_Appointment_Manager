const express = require("express");

const router = express.Router()
const {getFavorites, getRating, createRating, deleteRating, updateRating} = require('../controllers/rating');
const { authenticateUser } = require("../middlewares/auth");

router.get('/favorites', authenticateUser, getFavorites )
router.get('/:id', authenticateUser, getRating )
router.post('/', authenticateUser, createRating )
router.delete('/:id', authenticateUser, deleteRating )
router.put('/:id', authenticateUser, updateRating )

module.exports = router   