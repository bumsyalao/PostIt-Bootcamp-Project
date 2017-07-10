// const todosController = require('../controllers').todos;
const usersController = require('../controllers').Users;
// const groupsController = require('../controllers').groups;
const messagesController = require('../controllers').messages;

module.exports =(app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the PostIt API!',
	}));

	// app.post('/api/todos', todosController.create);
	app.post('/api/user/signup', usersController.create);
};
