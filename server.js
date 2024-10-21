require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const session = require('express-session');
const passportSetup = require('./passportSetup.js');
const passport = require('passport');
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

// Initialize passport
app.use(passport.initialize()); // this is to initialize the passport
app.use(passport.session()); // this is to use the session

// Test route

app.get('/', (req, res) => {
	res.send('Server is running on localhost');
});

app.use('/', require('./routes/index.js'));

mongodb.initDb((err, db) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	}
});
