const User = require("../../models/users");
const bcrypt = require("bcryptjs")
const BadRequestError = require("../../errors/BadRequestError")
const createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash)=>{
    User.create({ name, about, avatar, email, password:hash })
    .then((user) => {
      user.password =undefined
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("ValidationError"))
      } else if (err.name = "MongoError"){
        next(new BadRequestError("пользователь с таким email уже есть"))
      } else {
        next(err)
      }
    });
  })
};
module.exports = createUser;
