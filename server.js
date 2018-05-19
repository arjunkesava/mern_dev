const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Routes Config
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Server Remote DB config
const db = require('./config/keys.js').mongoURI;

// Mongoose Connection
mongoose
    .connect(db)
    .then(() => console.log("Mongo Connected, Continue"))
    .catch(err => console.log(err));

// Body Parser
const bodyParser = require('body-parser');

// Binding the Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Binding the Routes with app
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

app.get('/', (request, response) => response.send('Hell is here'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server has started on ${port}`));