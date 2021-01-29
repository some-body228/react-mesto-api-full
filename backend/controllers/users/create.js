const User = require("../../models/users");
const bcrypt = require("bcryptjs")
const BadRequestError = require("../../errors/BadRequestError")
const createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10).then(res=>console.log(res))
  bcrypt.hash(req.body.password, 10).then(res=>console.log(res))
  bcrypt.hash(req.body.password, 10).then((hash)=>{
    User.create({ name, about, avatar, email, password:hash })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("ValidationError"))
      } else {
        next(err)
      }
    });
  })
};
module.exports = createUser;
