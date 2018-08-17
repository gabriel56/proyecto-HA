const mongoose = require('mongoose');

const express = require('express')

const app = express()

const TweetSchema = new mongoose.Schema({
    text: {
        type: String, maxlenght = 280,  
    },
        author: 'object id'
})

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = {
    Tweet:Tweet
};