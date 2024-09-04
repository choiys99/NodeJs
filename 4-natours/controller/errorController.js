const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //예상가능한 오류 : 클라이언트 메시지한테 보낼꺼야
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //예상하지 못한 오류 세부정보 유출하기싫어
  } else {
    // 1) log error
    console.error('ERROR ㅁㅁ', err);

    // 2) send generie message
    res.status(500).json({
      status: '에러',
      message: '뭔가 메우 이상하게.. 잘못했어..',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // err객체에 statuscoderk 가 정의되어 있지 않다면 기본값 500을 설정
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(err, res);
  }
};
