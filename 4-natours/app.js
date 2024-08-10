const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());
//Express 애플리케이션에서 JSON 형태의 요청(request) body를 파싱(parse)하기 위해 사용되는 미들웨어

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: '썽꽁',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('DDDDD');
});

const port = 3000;
app.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔에 메시지 출력
  console.log(`App running on port ${port}...`);
});
