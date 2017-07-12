import models from '../models';

const Users = models.Users;

export default {

  signup(req, res) {
    Users
    .create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then((newUser) => {
      const userInfo = {
        username: newUser.username,
        email: newUser.email
      };
      return res.status(200).send(userInfo);
    })
    .catch(error => res.status(400).send(error.message));
  },

  signin(req, res) {
    Users.findOne({ where: { username: req.body.username } })
      .then((foundUser) => {
        console.log('=======================>>>>>>>>>>>>>>>', foundUser, foundUser.verifyPassword);
        if (foundUser && foundUser.verifyPassword(req.body.password)) {
          return res.status(200)
            .send({ success: true, message: 'You have logged in succesfully' });
        }
        return res.status(401)
          .send({ success: false, message: 'Incorrect username or password' });
      });
  },
};
