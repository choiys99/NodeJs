const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '이름이 빠졋오'],
      unique: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, '기간이 빠졌습니다.'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, '그룹 크기가 빠졌습니다.'],
    },
    difficulty: {
      type: String,
      required: [true, '난이도 설정이 빠졌습니다.'],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, '가격이 빠졋오'],
    },
    priceDiscount: Number,
    summery: {
      type: String,
      trim: [true, '설명이 빠졌습니다.'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, '표지 이미지가 필요합니다'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true }, // 옵셜 설정
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return parseFloat((this.duration / 7).toFixed(2));
  // return this.duration / 7; // 일 수를 주 단위로 변환
}); // 가상필드 정의 db저장되어있지않지만 다른 필드 의 값을 기반으로 계산된 결과 제공

//문서 미들웨어 : 저장하기 전에 특정 작업을 수행하는 코드
// 여기서 pre 메서드는 특정 이벤트가 발생하기 전에 실행할 함수를 정의합니다.
//'save' 이벤트는 문서가 데이터베이스에 저장되기 전에 호출
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// 쿼리 미들웨어
tourSchema.pre(/^find/, function (next) {
  // find로 시작하는 모든 명령어 실행
  // 여기서 this는 문서가 아닌 쿼리를 가르킨다.
  this.find({ secretTour: { $ne: true } }); // true가 아닌것

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Quert took ${Date.now() - this.start} millisecnds`);
  console.log(docs);
  next();
});

//집계 미들웨어

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
