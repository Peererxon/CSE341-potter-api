const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res
		.status(401)
		.send('You dont have permission to access this resource');
};

module.exports = isAuth;
