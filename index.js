const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const users = require('./routes/users');
const posts = require('./routes/posts');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', users, posts);

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((error, req, res, next) => {
    if(!req.file){
        console.log("no file")
    }
    if(req.file){
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured"});
});

const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});