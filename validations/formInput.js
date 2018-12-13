
const isEmpty = require('../utils/isEmpty')


function validateFormInput(userData){

    var errors = {}


    //checking for empty, null or undefined
    userData.phoneNumber = isEmpty(userData.phoneNumber) ? '' : userData.phoneNumber

    //validating phone Number
    var letters = /[0-9]{10}/
    var string =  userData.phoneNumber.trim();
    if(string.length !== 10 ||  string.match(letters) === null){
        errors["phoneNumber"] = "Invalid Phone Number"
    }

    return {
        errors : errors,
        isValid : isEmpty(errors)
    }
}

module.exports = validateFormInput;