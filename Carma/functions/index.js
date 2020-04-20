const functions = require('firebase-functions'),
	express = require('express'),
	admin = require('firebase-admin'),
	firebase = require('firebase');
(bodyparser = require('body-parser')),
	(indexRouter = require('./routes/index'));
var db = admin.database();
var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(indexRouter);
app.use('/static', express.static('./static/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res) {
	res.render('login');
});
 
//Error Code Page
app.get('/blank', isAuthenticated,function(req, res) {
	//Get Current UserID
	var currentUser=req.user.uid;
	var userRef = db.ref('/Users/'+currentUser+'/DTC/DTC Code');
	userRef.on('value', function(snapshot) {
		var data = JSON.stringify(snapshot.val);
		var testData = snapshot.val();
		testData = testData.substr(2, testData.length - 4);
		testData = testData.split('), (');
		var testDTC = testData[0].split(', ');
		res.render('blank', { code_num: testDTC[0], data: testDTC[1] });
	});
});

 
app.get('/carmd',isAuthenticated, function(req, res) {
	res.render('carmd');
});
app.get('/telemetry', isAuthenticated,function(req, res) {
	var currentUser=req.user.uid;
	res.render('telemetry',{currentUser:currentUser});
});
app.get('/tables', isAuthenticated,function(req, res) {
	res.render('tables');
});

// Authentication Middleware
function isAuthenticated(req,res,next){
    var user = firebase.auth().currentUser;
      if (user !== null) {
        req.user = user;
        next();
      } else {
      res.redirect('/login');
      }
    }

exports.app = functions.https.onRequest(app);
