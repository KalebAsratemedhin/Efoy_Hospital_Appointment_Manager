const express = require("express");

const router = express.Router()
const ratingController = require('../controllers/rating')
const passport = require('../strategies/jwt_strategy');

router.get('/favorites', passport.authenticate('jwt', { session: false }), ratingController.getFavorites )
router.get('/:id', passport.authenticate('jwt', { session: false }), ratingController.getRating )
router.post('/', passport.authenticate('jwt', { session: false }), ratingController.createRating )
router.delete('/:id', passport.authenticate('jwt', { session: false }), ratingController.deleteRating )
router.put('/:id', passport.authenticate('jwt', { session: false }), ratingController.updateRating )

module.exports = router   