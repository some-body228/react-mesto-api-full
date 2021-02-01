// eslint-disable-next-line no-unused-vars
const errors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? err.message : message });
};
module.exports = errors;
