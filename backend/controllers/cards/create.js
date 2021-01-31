const Card = require('../../models/cards');
const User = require('../../models/users');
const BadRequestError = require('../../errors/BadRequestError');

const cardCreate = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      User.findById(card.owner)
        .then((user) => {
          console.log(user);
          card.owner = user;
          res.send(card);
        });
    })
    .catch((err) => {
      if (err.name == 'ValidationError') {
        next(new BadRequestError('ValidationError'));
      } else {
        next(err);
      }
    });
};
module.exports = cardCreate;
