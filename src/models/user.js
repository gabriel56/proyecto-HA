const mongoose = require('mongoose');

const express = require('express')

const app = express()


const UserSchema = new mongoose.Schema({
    email: { 
        type: String,
        require: true,
        unique: true
       
    },
    password: {
        type: String,
        require: true,
    },

    username:{
        type: String,
        require: true,
        unique: true  
    }

})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User:User
};