const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');

const { validateCreateNewUser, validateUserLogin } = require('./middlewares/validate');
const { createNewUser, login } = require('./controllers/users');
const { errorVision } = require('./middlewares/errorVision');
const cors = require('./middlewares/cors');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

app.post('/signup', validateCreateNewUser, createNewUser);
app.post('/signin', validateUserLogin, login);
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.use((req, res, next) => {
  next(new NotFoundError('Указанная страница не найдена'));
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errors());
app.use(errorVision);

app.listen(PORT, () => {
  console.log('Сервер работает корректно');
});
