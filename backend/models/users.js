
const mongoose = require("mongoose");

const str = /^https?:\/\/w*\.?[-\._~:\/?#\[\]@!\$&'()\*\+,;\w\d]+#?$/;
const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь"
  },
  avatar: {
    type: String,
    validate: {
      validator(url) {
        return str.test(url);
      },
    },
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      }
    }
  },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    }
});

module.exports = mongoose.model("user", userSchema);
