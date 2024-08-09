const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // get 요청시 message 실행
  res.status(200).json({ message: '첫 번째 Get 요청', app: 'Natours' });
  //{} = 로 json형식의 응답
});

app.post('/', (req, res) => {
  res.send('첫번째 post 요청');
});

const port = 3000;
app.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔에 메시지 출력
  console.log(`App running on port ${port}...`);
});
