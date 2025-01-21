const ApiError = require('../exeptions/api-error');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.json({ message: err.status, errors: err.errors });
  }
  console.error('Непредвиденная ошибка:', err);
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
