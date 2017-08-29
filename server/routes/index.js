import usersController from '../controllers/users';
import groupsController from '../controllers/groups';
import messagesController from '../controllers/messages';
import usergroupsController from '../controllers/usergroups';
import auth from '../middleware/jwt';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PostIt API!',
  }));

//  api route to signup
  app.post('/api/user/signup', usersController.signup);

//  api route to signin
  app.post('/api/user/signin', usersController.signin);

// api route to create group
  app.post('/api/group', auth.checkToken, groupsController.create);

// api route to get all groups
  app.get('/api/groups', groupsController.retrieve);

//  api route to add users to group
  app.post('/api/group/:groupid/user', auth.checkToken, usergroupsController.create);

// api route to post message to group
  app.post('/api/group/:groupid/message', auth.checkToken, messagesController.create);

// api route to get message posted to a group.
  app.get('/api/group/:groupid/messages', auth.checkToken, messagesController.retrieve);

// api route to list all users in a group
  app.get('/api/group/:groupid/users', auth.checkToken, usergroupsController.listall);

// api route to view a users information
  app.get('/api/user', auth.checkToken, usersController.viewUser);

// api route to remove a user from a group
  app.delete('/api/group/:groupid/user', usergroupsController.removeUser);

// api route to send reset password email
  app.post('/api/user/forgot-password', usersController.sendResetPassword);

// api route to update password
  app.put('/api/user/update-password', usersController.updatePassword);
};
