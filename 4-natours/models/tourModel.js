const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름이 빠졋오'],
    unique: true,
  },
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
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
