const Users = require('../models').Users;

module.exports = {
	create(req, res) {
		Users
		.create({		
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		})
		.then(newUser => res.status(200).send(newUser))
		.catch(error => res.status(400).send(error));
	},
};