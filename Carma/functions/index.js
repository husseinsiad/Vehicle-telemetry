const functions = require('firebase-functions'),
	express = require('express'),
	admin = require('firebase-admin'),
	firebase = require('firebase');
(bodyparser = require('body-parser')),
	// (methodoverride = require('method-override')),
	(indexRouter = require('./routes/index'));
var db = admin.database();
var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(methodoverride('_method'));
app.use('/static', express.static('./static/'));
app.use(indexRouter);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res) {
	res.render('test');
});

//Error Code Page
app.get('/blank', function(req, res) {
	//Get Current UserID
	// var userid = firebase.auth().currentUser.uid;
	 
	var userRef = db.ref('/Users/' + "CYFfFMSnffRuE9nJzbwogTza2523" + '/DTC/DTC Code');
	userRef.on('value', function(snapshot) {
		var data = JSON.stringify(snapshot.val);
		var testData = snapshot.val();
		testData = testData.substr(2, testData.length - 4);
		testData = testData.split('), (');
		var testDTC = testData[0].split(', ');
		res.render('blank', { code_num: testDTC[0], data: testDTC[1] });
	});
});

app.get('/charts', function(req, res) {
	res.render('charts');
});
app.get('/carmd', function(req, res) {
	res.render('carmd');
});
app.get('/telemetry', function(req, res) {
	res.render('telemetry');
});
app.get('/tables', function(req, res) {
	res.render('tables');
});

//Midleware
// function isAuthenticated(req, res, next) {
// 	var user = firebase.auth().currentUser;
// 	if (user !== null) {
// 		req.user = user;
// 		next();
// 	} else {
// 		//   req.flash('error',"Please Login First!!");
// 		res.redirect('/login');
// 	}
// }

exports.app = functions.https.onRequest(app);
