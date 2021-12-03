const { Post, validatePost } = require("../models/postSchema");
const { User, validateUser } = require("../models/userSchema");
const express = require("express");
const router = express.Router();

router.get("/:id/posts", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = user.posts;
    if (!posts)
      return res
        .status(400)
        .send(`The post with id "${req.params.id}" does not exist`);

    return res.send(posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.get("/:id/posts/:postId", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res
          .status(400)
          .send(`The post with id "${req.params.id}" does not exist`);
      const post = user.posts.id(req.params.postId); 
      console.log(post)
      return res.send(post);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

router.post("/:id/posts", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.id}" does not exist.`);

    const post = new Post({
      description: req.body.description,
      likes: 0,
    });
    if (!post) return res.status(400).send(`Reply doesnt exist.`);
    user.posts.push(post);
    await user.save();
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id/posts/:postid", async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);

    const post = await Post.findByIdAndUpdate(
      req.params.postid,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        replies: req.body.replies
      },
      { new: true }
    );
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.id}" does not exist.`);

    await post.save();

    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id/posts/:postid", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
          "$pull": {
            "posts": {
              "_id": req.params.postid
            }
          }
        });
    if (!user)
      return res
        .status(400)
        .send(`The post with id "${req.params.postid}" does not exist.`);

    return res.send(user.posts.id(req.params.postid));
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});



module.exports = router;
