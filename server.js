require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./passportSetup.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(
	session({
		cookie: {
			secure: false,
		},
		secret: process.env.COOKIE_KEY,
		resave: false,
		saveUninitialized: true,
	})
);

// Test route
app.get('/', (req, res) => {
	res.send('Server is running on localhost');
});

app.use('/', require('./routes/index.js'));

// Auth Routes
//#swagger.tags=['auth']
app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

//#swagger.tags=['auth']
app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failed',
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.send('Login successful ' + JSON.stringify(req.user));
	}
);

//Logout
app.get('/logout', (req, res) => {
	req.session = null;
	req.logout();
	res.redirect('/');
});

mongodb.initDb((err, db) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	}
});
