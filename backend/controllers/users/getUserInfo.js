const User = require('../../models/users');
const NotFoundError = require('../../errors/NotFoundError');

const getUserInfo = (req, res, next) => {
  console.log(req.user);
  User.findOne({ _id: req.user._id }).then((user) => {
    if (!user) {
      throw new NotFoundError('такого пользователя нет');
    }
    const {
      name, about, avatar, _id,
    } = user;
    res.send({
      name, about, avatar, _id,
    });
  })
    .catch((err) => {
      next(err);
    });
};
module.exports = getUserInfo;
