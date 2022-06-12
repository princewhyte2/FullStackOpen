const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    favouriteGenre: {
        type: String,
        minlength: 4,
        required: true
    },
})

module.exports = mongoose.model('User', schema)