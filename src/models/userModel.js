const userDB = require('../database/usuarios');

const addUser = (user) => {
	id = Date.now();
	user = { id, ...user };
	userDB.push(user);
	return user;
};

const getUsers = () => {
	if (userDB.length > 0) {
		return userDB;
	} else {
		throw new Error('Internal server error');
	}
};

const editUser = (user) => {
	const { id, name, email, phone, password } = user;
	let userEdited = userDB.find((u) => u.id === id);
	if (userEdited) {
		if (name !== undefined) {
			userEdited.name = name;
		}
		if (email !== undefined) {
			userEdited.email = email;
		}
		if (phone !== undefined) {
			userEdited.phone = phone;
		}
		if (password !== undefined) {
			userEdited.password = password;
		}
		return userEdited;
	} else {
		throw new Error('Not Found');
	}
};

const userLogin = (email) => {
	const user = userDB.find((u) => u.email === email);
	if (user) {
		return user;
	} else {
		throw new Error('Not found');
	}
};

const findById = (id) => {
	const user = userDB.find((u) => u.id === id);
	if (user) {
		return user;
	} else {
		throw new Error();
	}
};

module.exports = { addUser, getUsers, editUser, userLogin, findById };
