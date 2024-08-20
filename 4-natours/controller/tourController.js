const fs = require('fs');
const Tour = require('./../models/tourModel');
const { json } = require('express');
const { match } = require('assert');

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
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // 쿼리 작성
    // 1) 필터링
    const queryObj = { ...req.query }; // 객체에서 모든 값을 가져옴
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) 고급 필터링
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = await Tour.find(JSON.parse(queryStr));

    //쿼리 실행
    const tours = await query;

    // 응답 보내기
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
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: '성공',
      message: `해당 ID : ${req.params.id}를 삭제 했습니다.`,
    });
  } catch (err) {
    res.status(404).json({
      status: '실패',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // 업데이트 문서 반환
      runValidators: true, // 업데이트시 유효성 검사 실행
    });
    res.status(200).json({
      status: '성공',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: '실패',
      message: err,
    });
  }
};
