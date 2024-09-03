module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // err객체에 statuscoderk 가 정의되어 있지 않다면 기본값 500을 설정
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
