const { addUser, getUsers, editUser } = require('../models/userModel');
const md5 = require('md5');

const add = async (req, res) => {
	let { name, email, phone, password } = req.body;
	if (!name || !phone)
		return res.status(400).send({ message: 'Há campos vazios!' });
	try {
		password = md5(password);
		const user = { name, email, phone, password };
		const insertUser = await addUser(user);
		return res.status(201).json(insertUser);
	} catch (err) {
		return res.status(500).json(err.message);
	}
};

const getAll = async (req, res) => {
	const page = req.query.page || 1;
	const limit = 2;
	try {
		const users = await getUsers();
		userPage = users.slice((page - 1) * limit, limit * page);
		return res.status(200).json(userPage);
	} catch (err) {
		return res.status(500).json(err.message);
	}
};

const edit = async (req, res) => {
	let { id } = req.params;
	id = parseInt(id);
	const { name, email, phone, password } = req.body;
	encriptedPassword = md5(password);
	try {
		const user = { id, name, email, phone, encriptedPassword };
		const editedUser = await editUser(user);
		return res.status(201).json(editedUser);
	} catch (err) {
		return res.status(404).json({ error: err.message });
	}
};

module.exports = { add, getAll, edit };
