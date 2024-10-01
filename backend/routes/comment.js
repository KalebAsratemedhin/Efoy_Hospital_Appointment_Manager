const express = require("express");

const router = express.Router()
const commentController = require('../controllers/comment');
const { authenticateUser } = require("../middlewares/auth");

router.get('/:id', authenticateUser, commentController.getComments)
router.post('/', authenticateUser, commentController.createComment)
router.delete('/:id', authenticateUser, commentController.deleteComment )
router.put('/:id', authenticateUser, commentController.updateComment)

module.exports = router