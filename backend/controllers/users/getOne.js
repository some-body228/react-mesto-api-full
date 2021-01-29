const User = require("../../models/users");
const NotFoundError = require("../../errors/NotFoundError")
const getOne = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if(!user){
        throw new NotFoundError("такого пользователя нет")
      }
      res.send(user);
    })
    .catch((err) => {
      next(err)
    });
};
module.exports = getOne;
