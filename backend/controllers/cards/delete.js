const Card = require('../../models/cards');
const NotFoundError = require('../../errors/NotFoundError');
const NoRightError = require('../../errors/NoRightError');

const cardDelete = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('нет такой карточки');
      }
      if (!(card.owner === req.user._id)) {
        throw new NoRightError('пользователь может удалить только свою карточку');
      }
      Card.findByIdAndRemove(req.params.id)
        // eslint-disable-next-line no-shadow
        .then((card) => {
          res.send(card);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = cardDelete;
