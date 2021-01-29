const { Error } = require("mongoose");

const errors = (err, req, res, next) => {
  const {statusCode = 500, message} = err
  console.log(statusCode)
    res.status(statusCode).send({message: statusCode===500? err.message: message})
}
module.exports = errors