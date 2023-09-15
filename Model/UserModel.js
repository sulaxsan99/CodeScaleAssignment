
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
    },
    location:{
        type: String,
        required: [true, 'Please enter Location']
    },
    weatherData : {
        type: JSON,
        required: [true, 'Please enter weather data ']
    },
},{
    timestamps: true 
})

module.exports = mongoose.model('user',userSchema)