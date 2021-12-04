const mongoose = require("mongoose");
const Joi = require("joi");
const {Post, postSchema} = require('./postSchema')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  dob: { type: Date, required: false},
  christmasPreference: { type: String, required: false},
  // friends: { type: [friendSchema], default: [] },
  posts: { type: [postSchema], default: [] },
  password: { type: String, required: true, maxlength: 200, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
  aboutMe: {type: String, maxlength: 1024, minlength: 5 },
  friendRequests: [{}]

});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    dob: Joi.date().required(),
    christmasPreference: Joi.string().required().allow("snowman","tree"),
  });
    return schema.validate(user);
}

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
