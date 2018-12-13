var express = require('express');
var router = express.Router();
const formInputValidate = require('../validations/formInput')
const dbOperations = require('../db/crudoperations/user')


router.post('/user-form',(request, response)=>{

  var body = request.body
  //validating phoneNumber (can be extended for other input variables)
  var {isValid, errors} = formInputValidate(body)

  if(isValid){
    // if validation is success, check if user already exists
  dbOperations.findByEmail(body.email,function(error, result){
    if(error){
      response.json({message : 'fail'})
    }else{
      //if user doesn't exist, create user and send mail else send message
      if(result){
        response.json({message : 'User with this email already exists !!!'})
      }else{
        dbOperations.createUser(body,(error, result)=>{
          if(error){
            response.status(403).json(error)
          }else{
              response.status(200).json(result)
          }
        })
      }
    }
  })
}else{
    response.status(422).json(errors)
  }
})

module.exports = router;
