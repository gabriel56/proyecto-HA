require('./config');
//require('./login');
require('./src/models/user');
const express = require('express');
const mongoose = require('mongoose');
const app = express();



mongoose.connect('mongodb://localhost/tweet');

mongoose.connection
    .once('open', () => console.log('Conexión con la base de datos establecida!'))
    .on('error', error => console.log(error));


    app.listen(process.env.PORT, ()=> {
        console.log('escuchando en puerto 3000');
    });