const Messages = require('../models').Messages;
const Groups = require('../models').Groups;

module.exports = {
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
  retrieve(req, res) {
    const groupId = Number(req.params.groupid);
    Groups.findById(groupId)
    .then((foundGroup) => {
      if (!foundGroup) {
        return res.status(404).send({ message: 'Group Not Found' });
      }
      console.log(foundGroup);
      Messages.findAll({
        where: {
          $and: {
            groupId,
            userId: req.decoded.userId
          }
        }
      })
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(400).send(error));
    });
  },
};

