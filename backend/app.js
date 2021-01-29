const express = require("express");

const{celebrate, Joi, errors} = require("celebrate")

const {requestLogger, errorLogger} = require("./middleware/logger")

const cardRouter = require("./routes/cards");
const userRouter = require("./routes/users");

const cors = require("cors")
const mongoose = require("mongoose");
const auth = require("./middleware/auth")

const options = {
  origin: [
  'http://localhost:8080',
  'https://nomoredomains.students.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,}

const { PORT = 3000 } = process.env;
const app = express();
app.use("*", cors(options))

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const login = require("./controllers/users/login")
const createUser = require("./controllers/users/create");

const errMiddleware = require("./middleware/erorr")


mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});


app.post("/signin", celebrate(
  {body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
    })}), login)
app.post("/signup", celebrate(
  {body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
    })}), createUser)
app.use(auth);
app.use("/", cardRouter);
app.use("/", userRouter);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});
app.use(errorLogger)

app.use(errors())

app.use(errMiddleware)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
