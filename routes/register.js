const express = require('express')
const router = express.Router()
var mongoose = require('mongoose')
var multer = require("multer")
var path = require("path")
var bcryptjs = require("bcryptjs")
var User = require('../models/user.js')

const storage = multer.diskStorage({
    destination: './static/images/uploads/',
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const uploadImage = multer({
    storage: storage,
    limits: {
      fileSize: 1000000
    },
    fileFilter: function (req, file, callback) {
      checkFileExt(file, callback);
    }
  }).single('profilePicture');

  function checkFileExt(file, callback) {
    const fileExt = /jpeg|jpg|png|gif/;
    const extName = fileExt.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileExt.test(file.mimetype);
  
    if (mimeType && extName) {
      return callback(null, true);
    } else {
      callback('File is not a image');
    }
  }

router.get('/', function (req, res) {
    res.render("register.ejs")
})

router.post('/', function (req, res) {

  function validate(req, res){

    return new Promise(function(resolve, reject){
      // Validate
      // req.check('firstName', 'Your first name has not enough characters').isLength({min:2})
      // req.check('lastName', 'Password is invalid').isLength({min: 2})
      req.check('genres', 'Select at least one genre').isEmpty()

      var errors = req.validationErrors();
      if(errors){
      
        req.session.errors = errors
        console.log(req.session.errors)
        res.render('register', {errors:req.session.errors})
        reject(new Error('User input is not valid yet'));
      }else{
        resolve();
      }
    })
  }



validate(req, res).then(function(){
    uploadImage(req, res, (error) => {
      if (error) {
        console.log(error);
      } 
        else {
          var firstName = req.body.firstName
          var lastName = req.body.lastName
          var emailaddress = req.body.emailaddress
          var genres = req.body.genres
          console.log(genres)
          // console.log(`${genres} and type = ${typeof genres}`)

          if (req.file){
            var profilePicture = `/images/uploads/${req.file.filename}`
          }
          bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, function (err, hash) {
              
              var newuser = new User()
              newuser.firstName = firstName
              newuser.lastName = lastName
              newuser.userName = emailaddress
              newuser.password = hash
              if(genres != 'undefined'){
                // console.log(genres + " " + typeof Object.keys(genres))
                genres.forEach(function(elem){
                  newuser.genres.push(elem)
                })
              }
              newuser.profilePicture = profilePicture
              newuser.save(function (err, savedUser) {
                if (err) {
                  console.log(err)
                  return res.status(500).send()
                }
                console.log(newuser)
                return res.status(200).redirect("/login")
  
              })
            });
          });
        }
      //}
    });
  }).catch(function(error){
    console.log(error)
  })
  })



module.exports = router;