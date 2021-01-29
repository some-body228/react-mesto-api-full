require('dotenv').config();
const NoAccessError = require("../errors/NoAccessError")
const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
  const {authorization} = req.headers
  if(!authorization){
    throw new NoAccessError("Необходима авторизация")
  }
  let payload
  const token = authorization.replace("Bearer ", "")
  try{
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    throw new NoAccessError("Необходима авторизация")
  }
  req.user = payload
  next();
};
module.exports = auth;
