// 1  모듈 불러오기
const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRotues');
const tourRouter = require('./routes/tourRoutes');

//2. Express 앱생성
const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  // 개발모드 확인
  app.use(morgan('dev')); // http 요청을 개발모드로 ...메서드,url,상태코드 등을 로그로 출력
}

//3.미들웨어 설정

app.use(express.json()); // json 형식의 요청 본문을 파싱..
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // 요청이 들어올 때 마다 실행
  req.requestTime = new Date().toISOString();
  next();
});

// 경로 핸들러

// 경로

app.use('/api/v1/tours', tourRouter); // /api/v1/tours 경로로 들어오는 요청을 tourRouter 에 연결
app.use('/api/v1/users', userRouter);

// 경로 예외처리
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: '실패',
    message: `찾을 수 없습니다 ${req.originalUrl} `,
  });
});

module.exports = app;
