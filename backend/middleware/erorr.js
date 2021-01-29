const { Error } = require("mongoose");

const errors = (err, req, res, next) => {
  const {statusCode = 500, message} = err
  console.log(statusCode)
    res.status(statusCode).send({message: statusCode===500? "На сервере произошла ошибка": message})
}
module.exports = errors