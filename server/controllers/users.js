import jwt from 'jsonwebtoken';
import models from '../models';

require('dotenv').config();

const Users = models.Users;
const secret = process.env.SECRET;

export default {

  signup(req, res) {
    if (req.body.username && req.body.email && req.body.password) {
      Users
        .create({
          username: req.body.username,
          email: req.body.email,
          phonenumber: req.body.phonenumber,
          password: req.body.password,
        })
        .then((newUser) => {
          const token = jwt.sign({
            userId: newUser.id,
            username: newUser.username,
            phonenumber: newUser.phonenumber,
            email: newUser.email
          }, secret, { expiresIn: '1 day' });
          const userInfo = {
            userId: newUser.id,
            username: newUser.username,
            phonenumber: newUser.phonenumber,
            email: newUser.email
          };
          return res.status(200).send({ token, userInfo });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    } else {
      return res.status(400)
        .send({ message: 'Incomplete registration details' });
    }
  },

  signin(req, res) {
    if (req.body.username && req.body.password) {
      Users.findOne({ where: { username: req.body.username } })
        .then((foundUser) => {
          if (foundUser && foundUser.verifyPassword(req.body.password)) {
            const token = jwt.sign({
              userId: foundUser.id,
              username: foundUser.username,
              email: foundUser.email
            }, secret, { expiresIn: '1 day' });
            return res.status(200)
              .send({
                token,
                foundUser,
                message: 'You have logged in succesfully'
              });
          }
          return res.status(401)
            .send({ success: false, message: 'Incorrect username or password' });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    } else {
      return res.status(400)
        .send({ message: 'Incomplete login details' });
    }
  },
};
