const mongoose = require("mongoose");
const Joi = require("joi");

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
  friends: { type: [friendsSchema], default: [] },
  posts: { type: [postSchema], default: [] },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: { type: String, required: true, minlength: 5, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 5, maxlength: 50 },
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    dob: { type: String, required: true, minlength: 5, maxlength: 50 },
  });
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
