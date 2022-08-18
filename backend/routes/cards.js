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
router.put('likes/:cardId', validateCardId, likeCard);
router.delete('likes/:cardId', validateCardId, dislikeCard);

module.exports = router;
