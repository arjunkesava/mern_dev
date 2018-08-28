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
// Passwort
const passport = require('passport');
// Path of files
const path = require('path')

// Binding the Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Binding the Routes with app
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

// Serve Statics in Production baby
if(process.env.NODE_ENV === 'production'){
    // Set Static Folder Baby
    app.use(express.static('client/build'));

    // Here, we serve all other requests
    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}

// Passport ka middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server has started on ${port}`));