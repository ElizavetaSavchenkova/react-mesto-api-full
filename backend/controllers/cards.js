const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const created = 201;

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send({ card });
      console.log('Карточки с сервера стянул');
    })
    .catch(next);
};

const createNewCard = (req, res, next) => {
  console.log('Привет');
  console.log('createNewCard');
  const { name, link } = req.body;
  const owner = req.user._id;
  //console.log('createNewCard');
  Card.create({ owner, name, link })
    .then((card) => {
      console.log('createNewCard: created');
      res.status(created).send({ card });
      console.log('createNewCard: sended response');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные. Не удалось создать новую карточку'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
        return;
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        next(new ForbiddenError('Невозможно удалить чужую карточку'));
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((data) => {
            res.send({ data });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные. Не удалось удалить карточку'));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные для постановки лайка некорректны'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные для удаления лайка некорректны'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getAllCards, createNewCard, deleteCard, likeCard, dislikeCard,
};
