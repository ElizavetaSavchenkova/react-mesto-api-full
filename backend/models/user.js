const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя пользователя должно содержать не менее 2-ух символов'],
    maxlength: [30, 'Имя пользователя должно содержать не более 30-ти символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле должно содержать не менее 2-ух символов'],
    maxlength: [30, 'Поле должно содержать не более 30-ти символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'error url',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'error email',
    },
  },
  password: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неверный пароль/почта'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неверный пароль/почта'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
