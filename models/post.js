const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  picture: { },
  description: { type: String, required: true, minlength: 5, maxlength: 50 },
  likes: { type: Number },
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    picture: Joi.object().require(),
    description: Joi.string().required(),
    likes: Joi.number()
  });
  return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;
exports.postSchema = postSchema;
