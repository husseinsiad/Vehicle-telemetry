const functions = require('firebase-functions'),
      express   = require('express'),
      firebase  = require('firebase-admin'),
       indexRouter= require('./routes/index');

      //Config Firebase
      var firebaseApp=firebase.initializeApp(
          functions.config().firebase
      )

      
 
      var app=express();
      app.use(indexRouter);
      app.set('views','./views');
      app.set('view engine','ejs');
        app.get('/',function(req,res){
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
        
exports.app = functions.https.onRequest(app);
