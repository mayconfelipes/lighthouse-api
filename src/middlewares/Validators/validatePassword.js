const validatePassword = (req, res, next) => {
	const { password, passwordConfirmation } = req.body;
	if (!password || !passwordConfirmation) {
		return res
			.status(400)
			.json({
				message: '"password" and "passwordConfirmation" are required',
			});
	}
	if (!password) {
		return res.status(400).json({ message: '"password" is required' });
	}
	testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
		password,
	);
	if (!testPassword) {
		return res.status(400).json({
			message:
				'A Senha deve conter ao menos Uma letra minúscula, Uma letra Maiúscula, Um número e no mínimo 8 caracteres',
		});
	}
	if (password !== passwordConfirmation) {
		return res.status(400).json({
			message: 'A Senha e a Confirmação devem ser iguais!',
		});
	}
	next();
};

module.exports = validatePassword;
