const messages = require('../models').messages;

module.exports = {
	create(req, res) {
		return messages
		.create( {
			
			message: req.body.message,

		})

		.then(todo => res.status(200).send(messages))
		.catch(error => res.status(400).send(error));
	},
};