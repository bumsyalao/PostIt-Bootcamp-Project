const messages = require('../models').Messages;

module.exports = {
  create(req, res) {
    return messages.create({

      message: req.body.message,

    })

.then(Messages => res.status(200).send(Messages))
.catch(error => res.status(400).send(error));
  },
};
