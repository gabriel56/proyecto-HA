const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweet');

mongoose.connection
    .once('open', () => console.log('Conexión con la base de datos establecida!'))
    .on('error', error => console.log(error));


