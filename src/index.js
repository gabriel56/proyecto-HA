require('./config/config.js');
//require('./login');

const express = require('express');
const mongoose = require('mongoose');
const routes = require ('./routes');

const app = express();

routes(app);


process.env.PORT = process.env.PORT || 8083;


process.env.URLDB = 'mongodb://localhost:27017/tweet';

// mongoose.connect('mongodb://localhost/tweet');

// mongoose.connection
//     .once('open', () => console.log('Conexión con la base de datos establecida!'))
//     .on('error', error => console.log(error));
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
  
    console.log('base de datos ONLINE');
  });

    app.listen(process.env.PORT, ()=> {
        console.log('escuchando en puerto:', process.env.PORT);
    });