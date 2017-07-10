const usergroups = require('../models').usergroups;

module.exports = {
	create(req, res) {
		return groups
		.create( {
			
			groupname: req.body.groupname,

		})

		.then(todo => res.status(200).send(groups))
		.catch(error => res.status(400).send(error));
	},
};