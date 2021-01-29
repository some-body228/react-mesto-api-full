const Card = require("../../models/cards");

const cardsGet = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err)
    });
};
module.exports = cardsGet;
