const{celebrate, Joi} = require("celebrate")

const cardRouter = require("express").Router();
const Card = require("../models/cards");
const cardCreate = require("../controllers/cards/create");
const cardDelete = require("../controllers/cards/delete");
const cardsGet = require("../controllers/cards/get");
const addLike = require("../controllers/cards/addLike");
const removeLike = require("../controllers/cards/removeLike");

cardRouter.get("/cards", cardsGet);
cardRouter.post("/cards",celebrate(
  {body: Joi.object().keys({
    name: Joi.string().required().min(2),
    link: Joi.string().required()
  })}), cardCreate);
cardRouter.delete("/cards/:id", cardDelete);
cardRouter.put("/cards/likes/:id", addLike);
cardRouter.delete("/cards/likes/:id", removeLike);

module.exports = cardRouter;
