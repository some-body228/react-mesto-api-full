const errors = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? err.message : message });
};
module.exports = errors;
