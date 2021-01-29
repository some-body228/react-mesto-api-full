const{celebrate, Joi} = require("celebrate")

const userRouter = require("express").Router();

const get = require("../controllers/users/get");
const getOne = require("../controllers/users/getOne");
const updateUsers = require("../controllers/users/update");
const updateAvatar = require("../controllers/users/updateAvatar");
const getUserInfo = require("../controllers/users/getUserInfo");



userRouter.get("/users", get);
userRouter.get("/users/me", getUserInfo);
userRouter.get("/users/:id", getOne);

userRouter.patch("/users/me", celebrate(
  {body: Joi.object().keys({
    name: Joi.string().required().min(2),
    about: Joi.string().required().min(3),
    avarat: Joi.string().required().email()
  })}), updateUsers);
userRouter.patch("/users/me/avatar",celebrate(
  {body: Joi.object().keys({
    avarat: Joi.string().required().email()
  })}), updateAvatar);




module.exports = userRouter;
