const Card = require("../../models/cards");
const NotFoundError = require("../../errors/NotFoundError")
const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if(!card){
        throw new NotFoundError("нет такой карточки")
      }
      res.send(card);
    })
    .catch((err) => {
      next(err)
    });
};
module.exports = removeLike;
