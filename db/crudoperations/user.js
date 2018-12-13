const User = require('../models/user');

const dbOperations = {

    createUser : function (userData){
        
        var user = new User({...userData})
        user.save().then(function(result){
            console.log(result)
        }).catch(function(err){
            console.log(err)
        })

    }
} 

module.exports = dbOperations;