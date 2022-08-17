require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createNewUser, login } = require('./controllers/users');
const { errorVision } = require('./middlewares/errorVision');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { validateCreateNewUser, validateUserLogin } = require('./middlewares/validate');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
const { PORT = 3000 } = process.env;
//не забудь поменять тут

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

app.post('/signup', validateCreateNewUser, createNewUser);
app.post('/signin', validateUserLogin, login);
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.use((req, res, next) => {
  next(new NotFoundError('Указанная страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorVision);

app.listen(PORT, () => {
  console.log('Сервер работает корректно');
});
