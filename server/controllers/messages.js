
const models = require('../models');

const Messages = models.Messages;
const Groups = models.Groups;
const Users = models.Users;

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

    Groups.findById(groupId)
    .then((foundGroup) => {
      if (!foundGroup) {
        return res.status(404).send({ message: 'Group Not Found' });
      }
      Messages.create({
        userId: req.decoded.userId,
        groupId: foundGroup.id,
        message: req.body.message,
        messagePriority: req.body.messagePriority,
      })
      .then(newMessage => res.status(200).send(newMessage))
      .catch(error => res.status(400).send(error));
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
    Groups.findById(groupId)
    .then((foundGroup) => {
      if (!foundGroup) {
        return res.status(404).send({ message: 'Group Not Found' });
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
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(400).send(error));
    });
  },
};

