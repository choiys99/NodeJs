const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1.미들웨어

app.use(express.json());

app.use((req, res, next) => {
  console.log('미들웨어 입니다.');
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: '썽꽁',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: '찾을수 없ㅅ브',
    });
  }

  res.status(200).json({
    status: '썽꽁',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tour/:id', updateTour);
// app.delete('/api/v1/tour/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
