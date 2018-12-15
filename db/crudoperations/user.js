const User = require('../models/user');

const dbOperations = {

    //argumrnts : userData = {name,email,dob,phoneNumber}
    //method for saving user document
    createUser : function (userData, callback){
        
        var user = new User({...userData})
        
        user.save(function(err, result){
            //handling error via callback
            if(err){
                callback(err, null)
            }else{
                if(result){
                    callback(null, result)
                    //once user is saved, now sending email
                    var email = {
                        to : userData.email,
                        subject : 'Registered Successfully',
                        emailText : "Congratulations " + userData.name + ", You have registered successfully"
                    }

                    var mailer = require('../../config/utils/mailer')
                    mailer.sendEmail(email)
                }
            }
        })

    },

    //arguments : email
    //method for finding user via email
    findByEmail : function(email, callback){
        User.findOne({email : email},function(error, result){
            if(error){
                callback(error, null)
            }else{
                callback(null, result)
            }
        })
    }
} 

module.exports = dbOperations;