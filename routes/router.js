var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path')
var app = express();  
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb')
var formidable = require('formidable');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://304cem:Blacklotus123@cluster0-gfbbm.azure.mongodb.net/test?retryWrites=true&w=majority";
app.set('view engine', 'ejs');  
mongoose.connect('mongodb+srv://304cem:Blacklotus123@cluster0-gfbbm.azure.mongodb.net/python');

var username = "";
router.use(bodyParser.urlencoded({extended: false}));
// GET route for homepage
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
  
});

//POST route for updating data
router.post('/', function (req, res, next) {
  
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Password doesn\'t match!');
    err.status = 400;
    res.send('Password doesn\'t match!');
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/main');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password!');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/main'); // go to the page
      }
    });
  } else {
    var err = new Error('All fields are required!');
    err.status = 400;
    return next(err);
  }
})

// GET route to redirect to '/profile' page after registering
router.get('/main', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
         
          username = user.username;
         // res.sendFile(path.join(__dirname , '../views/main.html'));
         res.render(path.join(__dirname , '../views/main.ejs'), {name:username} );
         // res.render(path.join(__dirname , '../views/main.html'), {name:username})
          

          //return res.send('<h2>Your name: </h2>' + user.username + '<h2>Your email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});


// GET for logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;