const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: '성공',
    data: {
      user: newUser,
    },
  });
});
