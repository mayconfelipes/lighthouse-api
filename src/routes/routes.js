const express = require('express');
const router = express.Router();

const {
	validateEmail,
	validatePassword,
	validateToken,
} = require('../middlewares/Validators');
const login = require('../middlewares/login');
const userController = require('../controllers/userController');

router.post('/login', login);

router.post('/usuarios', validateEmail, validatePassword, userController.add);

router.get('/usuarios', validateToken, userController.getAll);

router.put(
	'/usuarios/:id',
	validateToken,
	validateEmail,
	validatePassword,
	userController.edit,
);

module.exports = router;
