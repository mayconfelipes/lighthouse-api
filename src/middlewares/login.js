const { userLogin } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
require('dotenv').config();

const jwtConfig = { algorithm: 'HS256', expiresIn: '120sec' };

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		return res.status(400).json('No email');
	}
	if (!password) {
		return res.status(400).json('No password');
	}
	try {
		const exists = await userLogin(email);
		if (!exists) {
			return res.status(404).json('User not found');
		}
		const encPassword = md5(password);
		if (encPassword === exists.password) {
			const token = jwt.sign(
				{ id: exists.id },
				process.env.JWT_SECRET,
				jwtConfig,
			);
			return res.status(200).json({ token });
		} else {
			return res.status(401).json({ message: 'Wrong Password' });
		}
	} catch (e) {
		return res.status(500).json(e.message);
	}
};

module.exports = login;
