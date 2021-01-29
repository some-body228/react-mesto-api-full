const NotFoundError = require("../../errors/NotFoundError");
const Card = require("../../models/cards");
const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .populate('owner')
    .then((card) => {
      if(!card){
        throw new NotFoundError('нет такой карточки')
      }
      res.send(card);
    })
    .catch((err)=>{
      next(err)
    });
}
module.exports = addLike;