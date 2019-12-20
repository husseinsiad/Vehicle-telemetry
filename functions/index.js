const functions = require('firebase-functions'),
      express   = require('express'),
      firebase  = require('firebase-admin');

      //Config Firebase
      var firebaseApp=firebase.initializeApp(
          functions.config().firebase
      )
 
      var app=express();
      app.set('views','./views');
      app.set('view engine','ejs');
        app.get('/',function(req,res){
            res.render('index');
        })
        app.get('/index',function(req,res){
            res.render('index');
        })
        app.get('/blank',function(req,res){
            res.render('blank');
        })
        app.get('/charts',function(req,res){
            res.render('charts');
        })
        app.get('/tables',function(req,res){
            res.render('tables');
        })
        app.get('/register',function(req,res){
            res.render('register');
        })
        app.get('/login',function(req,res){
            res.render('login');
        })
        app.get('/forgot-password',function(req,res){
            res.render('forgot-password');
        })
exports.app = functions.https.onRequest(app);
