const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // to parse the incoming i/p json data..
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const loginRoutes = require('./Routes/login');
const signUpRoutes = require('./Routes/signUp');

app.use('/login', loginRoutes);
app.use('/signUp', signUpRoutes);
app.use(cors());

mongoose.connect('mongodb://localhost:27017/PurpllePCDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err)
        console.log(err);
    else
        console.log("connected to DB");
});

//LISTENING TO THE SERVER
app.listen(8000);