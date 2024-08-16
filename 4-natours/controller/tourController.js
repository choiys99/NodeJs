const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// ); 필요없음 테스트 목적으로 사용

// exports.checkID = (req, res, next, val) => {
//   // val = 매개변수
//   console.log(`tour id is : ${val}`);

//   if (!req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: '찾을수 없ㅅ브',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next, val) => {
//   if (!req.body.name || req.body.paice) {
//     return res.status(404).json({
//       status: 'fail',
//       message: '이름 또는 가격이 누락 되었습니다.',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: '썽꽁',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '실패',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // find.One({_id:req.params.id})
    res.status(200).json({
      status: '썽꽁',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '실패',
      message: err,
    });
  }
};

// const id = req.params.id * 1;
// const tour = tours.find((el) => el.id === id);

// res.status(200).json({
//   status: '썽꽁',
//   data: {
//     tour,
//   },
// });

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: '성공',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '실패',
      message: '잘못된 정보를 입력했습니다.',
    });
  }
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
