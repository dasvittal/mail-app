const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id           : String,
    token        : String,
    email        : String,
    name         : String
});

module.exports = mongoose.model('User', userSchema);