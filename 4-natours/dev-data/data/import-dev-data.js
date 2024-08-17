const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
dotenv.config({ path: './config.env' }); // 여기서 파일의 변수 읽기가 nojs에 의해 한번만 발생하면됨

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

// READ JSON FILSE
const tours = JSON.parse(
  fs.readdirSync(`${__dirname}./tours-simple.json`, 'utf-8'),
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('데이터가 성공적으로 로드되었습니다.');
  } catch (err) {
    console.log(err);
  }
};

// 모든 데이터 삭제

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('데이터가 성공적으로 삭제되었습니다.');
  } catch (err) {
    console.log(err);
  }
};
