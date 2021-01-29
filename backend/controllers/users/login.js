require('dotenv').config();
const User = require("../../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const NoAccessError = require("../../errors/NoAccessError")
const login = (req, res, next)=>{
const {email, password} = req.body
User.findOne({email}).select("+password")
.then((user)=>{
  if (!user){
    throw new NoAccessError("пароль или логин не правильный")
  }
  bcrypt.compare(password, user.password).then((matched)=>{
    if(!matched){
      throw new NoAccessError("пароль или логин не правильный")
    }
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
    res.send({token})
  })
  .catch((err)=>{
    next(err)
  })
})
  .catch((err)=>{
    next(err)
  })
}
module.exports= login;