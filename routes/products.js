const { User, validateUser } = require("../models/userSchema"); 
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {

        const users = await User.find();
        return res.send(users);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist`);

            return res.send(user);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
})

router.post('/', async (req, res) => {
    try {

        const {error} = validateProduct(req.body);
        if (error)
            return res.status(400).send(error);

        const product = new Product({
            name: req.body.name, 
            description : req.body.description,
            category: req.body.category,
            price: req.body.price,
        });
        await product.save();
    
        return res.send(product);

    
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})

router.put('/:id', async (req, res) => {
    try {

        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error);
        
        const user = await User.findByIdAndUpdate(
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
            if (!user)
                return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);

                await user.save();

                return res.send(user);

        } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }
        
})

router.delete('/:id', async (req, res) => {
    try {
        
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user)
            return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);

            return res.send(user);

        } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);

    }
})

module.exports = router;
