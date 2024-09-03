const express = require("express");

const router = express.Router()
const commentController = require('../controllers/commentController')
const passport = require('../strategies/jwt_strategy');


router.get('/:id', passport.authenticate('jwt', { session: false }), commentController.getComments)
router.post('/', passport.authenticate('jwt', { session: false }), commentController.createComment)
router.delete('/:id', passport.authenticate('jwt', { session: false }), commentController.deleteComment )
router.put('/:id', passport.authenticate('jwt', { session: false }), commentController.updateComment)

module.exports = router