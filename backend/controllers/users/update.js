const User = require("../../models/users");
const NotFoundError = require("../../errors/NotFoundError")
const BadRequestError = require("../../errors/BadRequestError")
const updateUsers = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .then((user) => {
      if(!user){
        throw new NotFoundError("нет такого пользователя")
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("ValidationError"))
      } else {
        next(err)
      }
    });
};
module.exports = updateUsers;
