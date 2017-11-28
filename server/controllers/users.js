import paginate from '../middleware/paginate';
import { sendForgotPasswordMail } from '../middleware/sendMail';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');

require('dotenv').config();

const Users = models.Users;
const UserGroups = models.Usergroups;
const secret = process.env.SECRET;


module.exports = {
  /**
   * Sign Up User
   * Route: POST: /user/signup
   * @param {object} request object
   * @param {object} response object
   * @returns {response} response object
   */
  signup(req, res) {
    if (req.body.username && req.body.email && req.body.password) {
      Users.create({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
      })
        .then((newUser) => {
          const token = jwt.sign(
            {
              userId: newUser.id,
              username: newUser.username,
              phoneNumber: newUser.phoneNumber,
              email: newUser.email
            },
            secret,
            { expiresIn: '1 day' }
          );
          const userInfo = {
            userId: newUser.id,
            username: newUser.username,
            phoneNumber: newUser.phoneNumber,
            email: newUser.email
          };
          return res.status(200).send({
            token,
            userInfo,
            message: 'Your account has been created'
          });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    } else {
      return res
        .status(400)
        .send({ message: 'Incomplete registration details' });
    }
  },

  /**
   * Sign In User
   * Route: POST: /user/signin
   * @param {object} request object
   * @param {object} response object
   * @returns {response} response object
   */
  signin(req, res) {
    if (req.body.username && req.body.password) {
      Users.findOne({ where: { username: req.body.username } })
        .then((foundUser) => {
          if (foundUser && foundUser.verifyPassword(req.body.password)) {
            const token = jwt.sign(
              {
                userId: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
                phoneNumber: foundUser.phoneNumber
              },
              secret,
              { expiresIn: '1 day' }
            );
            const userDetails = {
              userId: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              phoneNumber: foundUser.phoneNumber
            };
            return res.status(200).send({
              token,
              userDetails,
              message: 'You have logged in succesfully'
            });
          }
          return res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
          });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    } else {
      return res.status(400).send({ message: 'Incomplete login details' });
    }
  },

  /**
   * View a user
   * ROUTE: GET: /user
   * @param {object} request object
   * @param {object} response object
   */
  viewUser(req, res) {
    const userId = req.decoded.userId;
    Users.findOne({ where: { id: userId } })
      .then((user) => {
        if (user.length === 0) {
          res.status(404).send({ message: 'No User Found' });
        } else {
          res.status(200).send({ userInfo: user.filterUserDetails() });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'There was a server error, please try again'
        });
      });
  },

  /**
   * View a user's Groups
   * Route: GET: /user/:userid/groups
   * @param {object} request object
   * @param {object} response object
   */
  viewUserGroups(req, res) {
    const userId = req.params.userid;
    UserGroups.findAll({
      where: { userId },
      attributes: ['groupId', 'groupName']
    })
      .then((userGroups) => {
        res.status(200).send({ userGroups });
      })
      .catch(() => {
        res.status(400).send({
          message: 'No user found in group'
        });
      });
  },

  /**
   * View all Users
   * Routes: GET /users
   * @param {object} request object
   * @param {object} response object
   */
  viewUsers(req, res) {
    const { limit, offset, searchParam } = req.query;
    const search = `${searchParam}%`;
    Users.findAndCount({
      attributes: ['id', 'username', 'email'],
      limit: limit || 5,
      offset: offset || 0,
      where: {
        username: {
          $like: `${search || '%'}`
        }
      }
    })
      .then(({ rows: users, count }) => {
        res.status(200).send({
          message: 'Users found',
          users,
          metaData: paginate(count, limit, offset)
        });
      })
      .catch(() => {
        res.status(500).send({
          message: 'There was a server error, please try again'
        });
      });
  },

  /**
   * Send Reset password email
   * Routes: POST: /user/forgot-password
   * @param {object} request object
   * @param {object} response object
   * @returns {response} response object
   */
  sendResetPassword(req, res) {
    const email = req.body.email;
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(email, salt);
    const date = new Date();

    date.setHours(date.getHours() + 1);

    if (email === undefined || email.trim() === ' ') {
      res.status(400).send({
        data: { error: { message: 'email is not valid' } }
      });
      return;
    }
    Users.findOne({
      where: { email }
    }).then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        user
          .update({
            hash,
            expiryTime: date
          })
          .then((updatedUser) => {
            // send email here
            sendForgotPasswordMail(updatedUser.email, hash, req.headers.host);
            res.status(200).send({
              updatedUser: updatedUser.filterUserDetails()
            });
          })
          .catch((error) => {
            res.status(500).send({
              data: { error: { message: error } }
            });
          });
      }
    });
  },

  /**
   * Update Password
   * Route: POST: /user/update-password/:hash
   * @param {object} request object
   * @param {object} response object
   */
  updatePassword(req, res) {
    const newPassword = req.body.password;
    const hash = req.params.hash;
    Users.findOne({
      where: { hash }
    }).then((user) => {
      const email = user.email;
      const now = new Date();

      if (now > user.expiryTime) {
        return res.status(200).send({
          data: { error: { message: 'Expired or Invalid link' } }
        });
      }
      return user
        .update({ password: newPassword }, { where: { email } })
        .then(() =>
          res.status(200).send({
            data: { message: 'Password Reset Successful' }
          })
        );
    });
  }
};
