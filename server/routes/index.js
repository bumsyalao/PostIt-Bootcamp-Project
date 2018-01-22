const usersController = require('../controllers/users');
const groupsController = require('../controllers/groups');
const messagesController = require('../controllers/messages');
const userGroupsController = require('../controllers/userGroups');
const auth = require('../middleware/jwt');

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the PostIt API!'
    })
  );

  //  api route to signup
  app.post('/api/v1/user/signup', usersController.signup);

  //  api route to signin
  app.post('/api/v1/user/signin', usersController.signin);

  // api route to create group
  app.post('/api/v1/group', auth.checkToken, groupsController.create);

  // api route to get all groups
  app.get('/api/v1/groups', auth.checkToken, groupsController.retrieve);

  // api route to get a specific group
  app.get('/api/v1/group/:groupid', groupsController.retrieveGroup);

  //  api route to add users to group
  app.post(
    '/api/v1/group/:groupid/user/:userid',
    auth.checkToken,
    userGroupsController.addUser
  );

  // api to join a group
  app.post('/api/v1/group/:groupid/user', auth.checkToken,
  userGroupsController.joinGroup);

  // api route to post message to group
  app.post(
    '/api/v1/group/:groupid/message',
    auth.checkToken,
    messagesController.create
  );

  // api route to get message posted to a group.
  app.get(
    '/api/v1/group/:groupid/messages',
    auth.checkToken,
    messagesController.retrieve
  );

  // api route to get all groups for a user
  app.get(
    '/api/v1/user/:userid/groups',
    auth.checkToken,
    usersController.viewUserGroups
  );

  // api route to list all users in a group
  app.get(
    '/api/v1/group/:groupid/users',
    auth.checkToken,
    userGroupsController.listAllUsers
  );

  // api route to view a users information
  app.get('/api/v1/user', auth.checkToken, usersController.viewUser);

  // api route to view all users
  app.get('/api/v1/users', auth.checkToken, usersController.viewUsers);

  // api route to send reset password email
  app.post('/api/v1/user/forgot-password', usersController.sendResetPassword);

  // api route to update password
  app.put('/api/v1/user/update-password/:hash', usersController.updatePassword);
};
