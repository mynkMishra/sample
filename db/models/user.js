const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating userSchema
const UserSchema = new Schema({
   
    name : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    dob : {
        required : true,
        type : Date
    },
    phoneNumber : {
        required : true,
        type : String
    }
})

const User = mongoose.model('users', UserSchema)
module.exports = User;