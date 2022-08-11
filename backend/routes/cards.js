const router = require('express').Router();

const {
  getAllCards, createNewCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validateCreateNewCard,
  validateCardId,
} = require('../middlewares/validate');

router.get('/', getAllCards);
router.post('/', validateCreateNewCard, createNewCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
