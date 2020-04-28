var express = require('express'),
	admin = require('firebase-admin'),
	 flash = require('connect-flash'),
	 session = require('express-session'),
	firebase = require('firebase');
var router = express.Router();
//Register Service Account
var serviceAccount = require('../se491-5f60f-firebase-adminsdk-d7ri7-ba415830c6.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://se491-5f60f.firebaseio.com'
});
 
var db = admin.database();
//  web app's Firebase configuration
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
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});
 
router.get('/index', isAuthenticated,function(req, res) {
 
	var currentUser=req.user.uid;
	console.log("CurentUser " +currentUser);
	var tripDateRef=db.ref('/Users/'+currentUser+'/TripData');
		var childKey=[];
	tripDateRef.on("value", function(snap) {
		snap.forEach(function(childNodes){
			childKey.push(childNodes.key);
		})
	// childKey.slice(Math.max(childKey.length - 5, 0));
     	res.render('index',{tripData:childKey.slice(Math.max(childKey.length - 5, 0)),currentUser:currentUser});
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
			var userRef = db.ref('/Users/' + userid);
			userRef.on('value', function(snapshot) {
				var userData = snapshot.val();
				res.redirect('/index');
			});
		})
		.catch(function(error) {
			var errorMessage = error.message;
			res.render('login', { error: errorMessage });
		});
});

router.get('/logout', function(req, res) {
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
			// define database
			var refdb = db.ref().child('Users');
			// get userid and attach user information
			var userid = firebase.auth().currentUser.uid;
			var userRef = refdb.child(userid);
			var userData = { firstname: firstname, lastname: lastname };
			userRef.set(userData, function(error, user) {
				if (error) {
					var errorMessage = error.message;
					res.render('register', { error: errorMessage });
				} else {
					res.redirect('/index');
				}
			});

		})
		.catch(function(error) {
			var errorMessage = error.message;
			req.flash('error', errorMessage);
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
			res.render('login');
		})
		.catch(function(error) {
			var errorMessage = error.message;
			res.render('forgot-password', { error: errorMessage });
		});
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
	

module.exports = router;
