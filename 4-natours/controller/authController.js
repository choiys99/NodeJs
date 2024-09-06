const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//회원가입

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: '성공',
    token,
    data: {
      user: newUser,
    },
  });
});

// 로그인

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. 이메일 과 비밀번호가 실제로 존재 하는지 확인
  if (!email || !password) {
    return next(new AppError('이메일과 비밀번호를 제공해주세요!', 400));
  }

  // 2. 유저와 비밀번호가 올바른지 확인
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('이메일 혹은 비밀번호가 틀렸습니다.'), 401);
  }

  // 3.다 정상이라면 json 토큰을 클라이언트한테 보내기
  const token = signToken(user._id);
  res.status(200).json({
    status: '성공',
    token,
  });
});
