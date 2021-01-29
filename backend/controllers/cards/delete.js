const { findOneAndUpdate } = require("../../models/cards");
const Card = require("../../models/cards");
const NotFoundError = require("../../errors/NotFoundError");
const NoAccessError = require("../../errors/NoAccessError");
const cardDelete = (req, res, next) => {
  Card.findById(req.params.id)
    .then(card=>{
      if(!card){
         throw new NotFoundError("нет такой карточки")
       }
      if(!(card.owner == req.user._id)){
        throw new NoAccessError("пользователь может удалить только свою карточку")
      }
      Card.findByIdAndRemove(req.params.id)
       .then((card) => {
          res.send(card);
      })
      .catch((err) => {
        next(err)
      });
    })
    .catch((err) => {
      next(err)
    });
};
module.exports = cardDelete;
