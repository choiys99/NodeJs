const mongoose = require('mongoose');
const validator = require('validator');

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

  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요.'],
    minlength: 8,
  },

  passwordConfirm: {
    type: String,
    required: [true, '비밀번호를 확인해주세요.'],
    validate: {
      //This only works on SAVE and Created!!!

      validator: function (el) {
        return el === this.password;
      },
    },
  },

  phone: {
    type: String,
    unique: true,
    trim: true,
    required: [true, '번호를 입력해주세요'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
