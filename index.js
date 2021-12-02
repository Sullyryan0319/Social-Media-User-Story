const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const users = require('./routes/users');
const posts = require('./routes/posts');


connectDB();

app.use(express.json());
app.use('/api/users', users);
const port = process.env.PORT || 5050
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});