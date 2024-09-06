const User = require('./../models/userModel.js');
const APIFeatures = require('../utils/apiFeatures.js');
const catchAsync = require('./../utils/catchAsync.js');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // 응답 보내기
  res.status(200).json({
    status: '썽꽁',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: '아직 안만들었어ㅏ요',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: '아직 안만들었어ㅏ요',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: '아직 안만들었어ㅏ요',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: '아직 안만들었어ㅏ요',
  });
};
