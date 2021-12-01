const { User, validateUser } = require("../models/user");
const bcrypt = require('bcrypt')
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      christmasPreference: req.body.christmasPreference,
      password: await bcrypt.hash(req.body.password, salt),
    });

    await user.save();
    return res.send({ firstName: user.firstName, lastName: user.lastName, email: user.email, dob: user.dob, christmasPreference: user.christmasPreference });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
