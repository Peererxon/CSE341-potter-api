require("dotenv").config();
require('./passportSetup');
const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");
const session = require("express-session");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(
	session({
		cookie: {
			secure: false,
			httpOnly: true,
		},
		secret: process.env.COOKIE_KEY,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		res.send(`Logged in as ${req.user.displayName}`);
	} else {
		res.send("Logged out");
	}
});

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (_req, res) => {  
        res.redirect('/login-success');
    }
);

app.get('/login-success', (req, res) => {
	if (req.isAuthenticated()) {
		res.send('<h1>Login successful</h1>');
	} else {
		res.redirect('/');
	}
});

app.use("/", require("./routes/index.js"));

let server;

if (process.env.NODE_ENV !== 'test') {
	mongodb.initDb((err) => {  
		if (err) {
			console.log(err);
		} else {
			server = app.listen(port, () => {
				console.log(`Server is running on http://localhost:${port}`);
			});
		}
	});
}

module.exports = { app, server };