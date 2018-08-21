const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
let Schema = mongoose.Schema;

let tweetSchema = new mongoose.Schema({
    text: {
        type: String,   
    },
    
    author: ObjectId
})

module.exports = mongoose.model ('Tweet', tweetSchema);
