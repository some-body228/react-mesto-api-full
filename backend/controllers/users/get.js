const User = require("../../models/users");
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err)
    });
};
module.exports = getUsers;
