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

app.get('/api/v1/tours/:id', (req, res) => {
  // id : 매개변수
  console.log(req.params);

  const id = req.params.id * 1; // 해당문자열을 숫자로 바꿀 때 * 사용
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: '찾을수 없ㅅ브',
    });
  }

  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: `입력 하신 id :${id}는 찾을 수 없습니다.`,
  //   });
  // }

  res.status(200).json({
    status: '썽꽁',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: '성공',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tour/:id', (req, res) => {
  if (!req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: '찾을수 없ㅅ브',
    });
  }

  res.status(200).json({
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

app.delete('/api/v1/tour/:id', (req, res) => {
  if (!req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: '찾을수 없ㅅ브',
    });
  }

  res.status(204).json({
    statis: '성공',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔에 메시지 출력
  console.log(`App running on port ${port}...`);
});
