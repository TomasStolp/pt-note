var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user.js');

router.get('/', function avatar(req, res) {
    if (!req.session.user) {
      return res.status(401).redirect("login")
    }
    User.find({}, function (err, docs) {
        console.log(req.session.user)
     return res.status(200).
        render("avatar.ejs", {
            users: docs,
            currentUser: req.session.user    
        })
    })
})

router.post('/', function (req, res){
    var currentId = req.session.user._id
    console.log(currentId)
    var id = currentId

    User.findOne({_id: id}, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(500).send()
        } if (req.body.bike) { 
            user.bike = req.body.bike
            console.log(user.bike)
        }
        user.save(function (err, updatedObject) {
            if (err) {
              console.log(err)
              res.status(500).send()
            } else {
              res.redirect("avatar")
            }
          })
    });
})

module.exports = router;