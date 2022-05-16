const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
	const accessToken = req.header('accessToken');

	if (!accessToken) {
		res.json({ error: 'User not logged in!' });
	} else {
		const validToken = verify(accessToken, 'importantsecret');
		req.user = validToken;
		if (validToken) {
			return next();
		} else {
			return res.json({ error: err });
		}
	}
};

module.exports = { validateToken };
