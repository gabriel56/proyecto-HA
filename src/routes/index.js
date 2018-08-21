const express = require('express');

// app.use( require('./users'));
// app.use( require('./tweets/tweet.js'));

const users = require( './users');
const tweets = require( './tweets');




module.exports = (app) => {
    users(app);
    tweets(app);

}
