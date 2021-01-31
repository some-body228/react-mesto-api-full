const regexp = /^https?:\/\/w*\.?[-\._~:\/?#\[\]@!\$&'()\*\+,;\w\d]+#?$/;
const { celebrate, Joi } = require('celebrate');

const cardRouter = require('express').Router();
const Card = require('../models/cards');
const cardCreate = require('../controllers/cards/create');
const cardDelete = require('../controllers/cards/delete');
const cardsGet = require('../controllers/cards/get');
const addLike = require('../controllers/cards/addLike');
const removeLike = require('../controllers/cards/removeLike');

cardRouter.get('/cards', cardsGet);
cardRouter.post('/cards', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2),
      link: Joi.string().required().pattern(regexp),
    }),
  },
), cardCreate);
cardRouter.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), cardDelete);
cardRouter.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), addLike);
cardRouter.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), removeLike);

module.exports = cardRouter;
