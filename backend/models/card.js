const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
    minLength: [2, 'Название карточки должно содержать не менее 2-ух символов'],
    maxLength: [30, 'Название карточки должно содержать не более 30-ти символов'],
  },
  link: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
    validate: [isUrl, 'Пожалуйста, укажите корректный url-адрес'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
