// error-middleware.js

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Bir hata oluştu." });
}

module.exports = errorHandler;
