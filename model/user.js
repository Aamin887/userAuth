const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,

    },
    email:{
        type: String, 
        unique: true
    }, 
    password: {
        type: String
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);