// const todosController = require('../controllers').todos;
const usersController = require('../controllers').Users;
const groupsController = require('../controllers').groups;
const messagesController = require('../controllers').messages;
const usergroupsController = require('../controllers').usergroups;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIt API!',
  }));

//  api route to signup
  app.post('/api/user/signup', usersController.create);
//  api route to signin
  app.post('/api/user/signin', usersController.create);
// api route to create group
  app.post('/api/user/group', groupsController.create);
//  api route to add users to group
  app.post('/api/group/<groupid>/user', usergroupsController.create);
// api route to post message to group
  app.post('/api/group/<goupid>/message', messagesController.create);
// api route to get message posted to a group.
  app.get('/api/group/<groupid>/messages', messagesController.getmessage);
};
