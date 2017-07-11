const Messages = require('../models').Messages;

module.exports = {
  create(req, res) {
    return Messages.create({

      message: req.body.message,

    })

.then(newMessage => res.status(200).send(newMessage))
.catch(error => res.status(400).send(error));
  },
};
