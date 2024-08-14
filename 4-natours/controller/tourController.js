const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  // val = 매개변수
  console.log(`tour id is : ${val}`);

  if (!req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: '찾을수 없ㅅ브',
    });
  }
  next();
};

exports.checkBody = (req, res, next, val) => {
  if (!req.body.name || req.body.paice) {
    return res.status(404).json({
      status: 'fail',
      message: '이름 또는 가격이 누락 되었습니다.',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: '썽꽁',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: '썽꽁',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
  res.status(204).json({
    statis: '성공',
    data: null,
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    data: {
      tour: '<Updated tour here...>',
    },
  });
};
