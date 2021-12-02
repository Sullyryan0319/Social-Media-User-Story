const mongoose = require("mongoose");
const Joi = require("joi");
const {Post, postSchema} = require('./postSchema')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 5, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  dob: { type: String, required: true, minlength: 5, maxlength: 50 },
  christmasPreference: { type: String, required: true},
  // friends: { type: [friendSchema], default: [] },
  posts: { type: [postSchema], default: [] },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    dob: Joi.string().min(5).max(50).required(),
    christmasPreference: Joi.string().required().allow("snowman","tree"),
  });
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
