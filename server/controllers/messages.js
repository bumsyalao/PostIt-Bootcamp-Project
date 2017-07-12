const Messages = require('../models').Messages;

module.exports = {
  create(req, res) {
    const groupId = Number(req.params.groupid);
    Messages.findById(groupId)
    .then((foundGroup) => {
      Messages.create({
        groupId: foundGroup.id,
        message: req.body.message,
      })
      .then(newMessage => res.status(200).send(newMessage))
      .catch(error => res.status(400).send(error));
    });
  },
};

