const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Server Remote DB config
const db = require('./config/keys.js').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("Mongo Connected, Continue"))
    .catch(err => console.log(err))

app.get('/', (request, response) => response.send('Hell is here'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server has started on ${port}`));