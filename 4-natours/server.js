const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // 여기서 파일의 변수 읽기가 nojs에 의해 한번만 발생하면됨
const app = require('./app2');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewURLParser: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('연결에 성공했습니다.');
  });

// console.log(app.get('env')); // express에서 현재 환경 설정을 출력
// console.log(process.env); //  Node.js에서 현재 프로세스의 환경 변수를 출력

const port = process.env.PORT || 3000; // port 설정값이 없다면 기본값으로 3000으로 사용
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
