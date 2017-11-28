
import sendMail from '../middleware/sendMail';

const models = require('../models');

const Messages = models.Messages;
const Groups = models.Groups;
const Users = models.Users;
const UserGroups = models.Usergroups;


module.exports = {

  /**
   * Create new message
   * Route: POST: /group/:groupid/message
   *
   * @param {object} request object
   * @param {any} response object
   */
  create(req, res) {
    const groupId = Number(req.params.groupid);
    const userId = req.decoded.userId;

    // Check if group exist
    Groups.findById(groupId).then((group) => {
      if (!group) {
        return res.status(404).send({ message: 'Group not found' });
      }
    }
      );
    // Check if user exist in group
    UserGroups.findOne({
      where: {
        userId,
        groupId
      }
    })
      .then((record) => {
        if (!record) {
          return res.status(401).send({
            message: 'Not a member, Join group to post message'
          });
        }

        Messages.create({
          userId: req.decoded.userId,
          groupId: record.groupId,
          message: req.body.message,
          messagePriority: req.body.messagePriority,
        })
      .then((newMessage) => {
        UserGroups
          .findAll({
            where: {
              groupId: record.groupId
            },
            attributes: ['userId'],
            include: [
              {
                model: Users,
                attributes: ['username', 'phoneNumber', 'email']
              }
            ]
          }).then((users) => {
                // send email here
            if (req.body.messagePriority === 'urgent') {
              sendMail(users, req.body.message, req.body.messagePriority);
            }
            if (req.body.messagePriority === 'critical') {
              sendMail(users, req.body.message, req.body.messagePriority);
            }
          });
        res.status(200).send({
          newMessage,
          message: 'message posted succesfully'
        });
      })
      .catch(error => res.status(500).send(error));
      });
  },

  /**
   * Retrieve message
   * Route: GET: /group/:groupid/messages
   *
   * @param {object} request object
   * @param {object} response object
   */
  retrieve(req, res) {
    const groupId = Number(req.params.groupid);
    const userId = req.decoded.userId;
    // Check if group exist
    Groups.findById(groupId).then((group) => {
      if (!group) {
        return res.status(404).send({ message: 'Group not found' });
      }
    }
    );
    // Check if user is in group
    UserGroups.findOne({
      where: {
        userId,
        groupId
      }
    })
    .then((record) => {
      if (!record) {
        return res.status(401).send({
          message: 'Not a member, Join Group to view message'
        });
      }
      Messages.findAll({
        where: {
          groupId
        },
        include: [{
          model: Users,
          attributes: ['username']
        }]
      })
      .then(messages => res.status(200).send({
        messages
      }))
      .catch(error => res.status(500).send(error));
    });
  },
};

