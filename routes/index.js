var express = require('express');
var router = express.Router();
const formInputValidate = require('../validations/formInput')
const dbOperations = require('../db/crudoperations/user')
const path = require('path')

router.get('/*',(request, response)=>{
  response.sendFile(path.join(__dirname, '/../public/index.html'));
    // console.log(pathToIndex)
  // response.sendfile(pathToIndex)
})

// router.get('/user-form',(request, response)=>{
//   response.send()
//   console.log('Reloaded')
// })
//@route POST /user-form
//@description Create a user in db
router.post('/user-form',(request, response)=>{
  console.log(request.url)
  var body = request.body
  //validating phoneNumber (can be extended for other input variables)
  var {isValid, errors} = formInputValidate(body)

  if(isValid){
    // if validation is success, check if user already exists
  dbOperations.findByEmail(body.email,function(error, result){
    if(error){
      response.json({message : 'fail'})
    }else{
      //checkong if user already exist
      if(result){
        response.status(200).json({message : 'User with this email already exists !!!'})
      }else{
        //if user doesn't exist, create user and send mail else send message
        dbOperations.createUser(body,(error, result)=>{
          if(error){
            response.status(200).json({message : 'Something Went Wrong !!!'})
          }else{
              response.status(200).json({message : 'Registered Successfully'})
          }
        })
      }
    }
  })
}else{
    response.status(200).json({message : 'Invalid Phone Number'})
  }
})

module.exports = router;
