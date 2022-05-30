const jwt = require('jsonwebtoken');
const { findById } = require('../../models/userModel');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({
				message: 'Token not found',
			});
		}
		const decoded = jwt.verify(token, secret);
		const user = await findById(decoded.id);
		if (!user) {
			return res.status(400).json({ message: 'Invalid fields' });
		}
		req.user = user;
		next();
	} catch (e) {
		return res.status(403).json({ message: 'Expired or invalid token' });
	}
};

module.exports = validateToken;
