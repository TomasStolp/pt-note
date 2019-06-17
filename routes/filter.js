/*jshint esversion : 6 */

var express = require("express");
var path = require("path");
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var user = require("../models/user.js");

mongoose.connect('mongodb://localhost:27017/MotoMatch'); 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function(callback) {
//The code in this asynchronous callback block is executed after connecting to MongoDB. 
    console.log('Successfully connected to MongoDB.');
});

// var Schema = mongoose.Schema;
// var userSchema = new Schema({
//     name: String,
//     lName: String,
//     genres: String,
//     location: String,
//     fav_movies: Array,
// });
var filterUsers = [];
// var user = mongoose.model('user', userSchema);


// router.set("views", path.join(__dirname, "views"));
// router.set("view engine", "ejs");
router.use(bodyParser.urlencoded({ extended: false }));
router.get("/", function(req, res) {
    res.render("filter.ejs");
    });
    router.get('/', function(req, res, next) {
    // res.render('filter', {output: req.params.genre, lUsers : filterUsers});
});
router.post('/', function(req, res, next){
    var genre = req.body.genre;
    user.find({genres: genre}, function(error, test) {
        if (error) {
            console.log(error);
        } else {
        //    filterUsers = test;
        filterUsers.push(test);
           console.log(Object.values(filterUsers));
           
        }
    });
    res.redirect('/filter/');
});
// router.listen(1444, function(){
//     console.log('Listening at Port 1444');
// });

module.exports = router;