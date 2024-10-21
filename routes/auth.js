const express = require('express');
const router = express.Router();
const passport = require('passport');

// Auth Routes
//#swagger.tags=['auth']
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

//#swagger.tags=['auth']
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failed',
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.send('Login successful ' + JSON.stringify(req.user));
	}
);

//Logout
router.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			res.status(500).send('Error logging out');
		}
	});
	res.redirect('/');
});

module.exports = router;
