const errorVision = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: '500 error' });
  }
  next();
};

module.exports = { errorVision };
