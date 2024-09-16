const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//이름 이메일 번호 비밀번호 비밀번호확인

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름이 빠졋오'],
  },

  email: {
    type: String,
    required: [true, '이메일을 입력해주세요'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, '유요하지 이메일 형식입니다.'],
  },

  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요.'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, '비밀번호를 확인해주세요.'],
    validate: {
      //This only works on SAVE and Created!!!
      validator: function (el) {
        return el === this.password;
      },
      message: '동일한 비밀번호가 아닙니다.',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// 비밀번호 수정할때마다 암호화
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  // this.passwordChangedAt = Date.now();
  next();
});

//  입력된 비밀번호가 저장된 비밀번호와 일치하는지 확인
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JWTTimestamp);
  }

  return false; // 기본값으로 false 설정.. 유저가 비밀번호를 변경하지 않았음
};

// 비밀번호 재설정 토큰을 생성하는 메서드
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
