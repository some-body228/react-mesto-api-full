const express = require('express');

// eslint-disable-next-line no-useless-escape
const regexp = /^https?:\/\/w*\.?[-\._~:\/?#\[\]@!\$&'()\*\+,;\w\d]+#?$/;

const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middleware/logger');

const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const auth = require('./middleware/auth');

const options = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://nomoredomains.students.nomoredomains.rocks',
    'https://some-body228.github.io/react-mesto-api-full/frontend/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTION'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();
app.use('*', cors(options));

app.use(bodyParser.json());

const login = require('./controllers/users/login');
const createUser = require('./controllers/users/create');

const errMiddleware = require('./middleware/erorr');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), login);
app.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2),
      about: Joi.string().min(3),
      avatar: Joi.string().pattern(regexp),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).pattern(/\s/, { invert: true }),
    }),
  },
), createUser);
app.use(auth);
app.use('/', cardRouter);
app.use('/', userRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorLogger);

app.use(errors());

app.use(errMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
