const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름이 빠졋오'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, '가격이 빠졋오'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
