const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures.js');

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
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficul';
  next();
};

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
    // const queryObj = { ...req.query }; // 객체에서 모든 값을 가져옴 (js객체)
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]); // 필터처리

    // // 2) 고급 필터링
    // let queryStr = JSON.stringify(queryObj); // js객체를 json으로
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // 값 찾아서 변경
    // console.log(JSON.parse(queryStr)); // 다시 json을 js객체로

    // let query = Tour.find(JSON.parse(queryStr));

    // 3) 정렬
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy); // srot값을 받으면 해당쿼리결과 정렬
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // 4) 필드 제한
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v'); // -는 포함X 제외시킴
    // }

    // 5) 페이징처리
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments(); // countDocuments = 특정 컬렉션의 문서 수 계산
    //   if (skip >= numTours) throw new Error('존재하지 않는 페이지입니다.');
    // }

    //쿼리 실행
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    // 응답 보내기
    res.status(200).json({
      status: '썽꽁',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: '실패',
      message: err.message,
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      //aggregate 집계할때 사용
      {
        $match: { ratingsAverage: { $gte: 4.5 } }, // 4.5 이상만
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' }, // 그룹화 : 내가 지정한 id 를 기준으로 아래가 집계
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, // 1 오름차순을 뜻한다
      },
      {
        $match: { _id: { $ne: 'EASY' } }, // 지정된 id 값 제외 : EASY
      },
    ]);

    res.status(200).json({
      status: '성공',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: '실패',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates', // $unwind = 배열을 분해하여 개별문서로 변환
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`), // 지정된 값만
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          torus: { $push: '$name' }, // $push : 지정된 필드의 값을 배열로 수집
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 }, // 필드에 0 지정하면 결과에서 지정.. 1로 하면 포함..
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);
    res.status(200).json({
      status: '성공',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: '실패',
      message: err,
    });
  }
};
