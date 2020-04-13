var express = require('express'),
	admin = require('firebase-admin'),
	 flash = require('connect-flash'),
	// cookieParser    = require('cookie-parser'),
	 session = require('express-session'),
	firebase = require('firebase');
var router = express.Router();

var serviceAccount = require('../se491-5f60f-firebase-adminsdk-d7ri7-ba415830c6.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://se491-5f60f.firebaseio.com'
});
// admin.initializeApp();
var db = admin.database();
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC8ek2z-3xDI8rlaePQiOw-NDByJI8JqZ4',
	authDomain: 'se491-5f60f.firebaseapp.com',
	databaseURL: 'https://se491-5f60f.firebaseio.com',
	projectId: 'se491-5f60f',
	storageBucket: 'se491-5f60f.appspot.com',
	messagingSenderId: '541695700970',
	appId: '1:541695700970:web:1438c4a2ac47ea4fe4cc93',
	measurementId: 'G-08J4E1H1P2'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
//   firebase.auth.Auth.Persistence.LOCAL;
// router.use(cookieParser());
router.use(
	session({
		cookie: { maxAge: 60000 },
		secret: 'woot',
		resave: false,
		saveUninitialized: false
	})
);

router.use(flash());
router.use(function(req, res, next) {
	// res.locals.currentUser=firebase.auth().currentUser;
	res.locals.currentUser = req.flash('currentUser');
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

//Authentication Middleware
// function isAuthenticated(req,res,next){
//     var user = firebase.auth().currentUser;
//       if (user !== null) {
//         req.user = user;
//         next();
//       } else {
//     //   req.flash('error',"Please Login First!!");
//       res.redirect('/login');
//       }
//     }
router.get('/index', function(req, res) {
	var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData');
		var childKey=[];
	tripDateRef.on("value", function(snap) {
		snap.forEach(function(childNodes){
			childKey.push(childNodes.key);
		})
     	res.render('index',{tripData:childKey});
	})
	
});
 

router.get('/', function(req, res) {
	res.render('login');
});
router.get('/login', function(req, res) {
	res.render('login');
});
router.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(function(user) {
			//Get Current UserID
			var userid = firebase.auth().currentUser.uid;
			// Get User Information
			// console.log(userid);
			var userRef = db.ref('/Users/' + userid);
			userRef.on('value', function(snapshot) {
				var userData = snapshot.val();
				//  req.flash('currentUser',userData.firstname)
				//  req.flash('currentUser',"HUSSEIN");
				res.redirect('/index');
			});
		})
		.catch(function(error) {
			var errorMessage = error.message;
			//  req.flash('error', errorMessage);
			res.render('login', { error: errorMessage });
		});
});

router.get('/logout', function(req, res) {
	// req.flash("success","You Logged Out!!");
	res.redirect('/login');
});

router.get('/register', function(req, res) {
	res.render('register');
});
router.post('/register', function(req, res) {
	var email = req.body.email;
	var firstname = req.body.firstName;
	var lastname = req.body.lastName;
	var password = req.body.password;

	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(function(user) {
			// console.log(user)
			// define database
			var refdb = db.ref().child('Users');
			// get userid and append user information
			var userid = firebase.auth().currentUser.uid;

			var userRef = refdb.child(userid);

			var userData = { firstname: firstname, lastname: lastname };

			userRef.set(userData, function(error, user) {
				if (error) {
					var errorMessage = error.message;
					// req.flash("error",errorMessage);
					res.render('register', { error: errorMessage });
				} else {
					// req.flash("currentUser",req.body.firstname)
					res.redirect('/index');
				}
			});

			// 	res.render("login");
		})
		.catch(function(error) {
			var errorMessage = error.message;
			req.flash('error', errorMessage);
			// console.log(error);
			res.redirect('/register');
		});
});

router.get('/forgot-password', function(req, res) {
	res.render('forgot-password');
});

router.post('/forgot-password', function(req, res) {
	var email = req.body.email;

	firebase
		.auth()
		.sendPasswordResetEmail(email)
		.then(function(user) {
			// alert("Email has been sent: Check your email and verify ");
			// console.log(user)
			res.render('login');
		})
		.catch(function(error) {
			var errorMessage = error.message;
			//  alert("Error message: " +errorMessage);
			res.render('forgot-password', { error: errorMessage });
		});
});
 

module.exports = router;
