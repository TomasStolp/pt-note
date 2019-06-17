var express = require('express')
var router = express.Router()
var bcryptjs = require("bcryptjs")
var User = require('../models/user.js')

// Validation
//Get "/login"
router.get('/', function(req, res) {
    res.render('login.ejs')
})

//Post "/login"
router.post('/', function (req, res) {
  console.log(req.body.userName)

  function validate(req, res){
    // console.log(req.body.userName)

    return new Promise(function(resolve, reject){
    // Validate
    req.check('userName', 'Invalid email address').isEmail()
    req.check('password', 'Password is invalid').isLength({min: 3})

    var errors = req.validationErrors();
    if(errors){
      
      req.session.errors = errors
      console.log(req.session.errors)
      res.render('login', {errors:req.session.errors})
      reject(new Error('User input is not valid yet'));
    }else{
      resolve();
    }
  })
}

    validate(req, res).then(function(){
      var username = req.body.userName.toLowerCase()
      var password = req.body.password

      User.findOne({
        userName: username
      }, function (err, user) {

          if (user) {
            bcryptjs.compare(password, user.password, function (err, user) {
    
            console.log("login succesful")
            res.redirect("/")
            return res.status(200).send()
          })
          req.session.user = user;
        } else {
          console.log("login unsuccessful")
          return res.status(404).redirect("/login")
        }
      })
    })
    .catch(function(error){
      console.log(error);
    })
  })
  

  
  module.exports = router;