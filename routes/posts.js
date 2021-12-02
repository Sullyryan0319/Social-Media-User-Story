const { Post, validatePost } = require("../models/postSchema"); 
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {

        const posts = await Post.find();
        return res.send(posts);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(400).send(`The post with id "${req.params.id}" does not exist`);

            return res.send(post);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
})

router.post('/:id/posts', async (req, res) => {
    try {

        const {error} = validatePost(req.body);
        const user = await User.findById(req.params.id);
        if (error)
            return res.status(400).send(error);

        const post = new Post({
            // picture: req.body.picture, 
            description : req.body.description,
            likes: 0,

        });

        user.posts.push(post);
        await user.save();
    
        return res.send(user);

    
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})

router.put('/:id/posts/:id', async (req, res) => {
    try {

        const { error } = validatePost(req.body);
        if (error) return res.status(400).send(error);
        
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                dob: req.body.dob
            },
            { new: true} 
            );
            if (!post)
                return res.status(400).send(`The post with id "${req.params.id}" does not exist.`);

                await post.save();

                return res.send(post);

        } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }
        
})

router.delete('/:id', async (req, res) => {
    try {
        
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post)
            return res.status(400).send(`The post with id "${req.params.id}" does not exist.`);

            return res.send(post);

        } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);

    }
})

module.exports = router;
