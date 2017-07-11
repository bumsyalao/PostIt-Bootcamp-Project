const Groups = require('../models').Groups;

module.exports = {
  create(req, res) {
    Groups.create({
      groupname: req.body.groupname,

    })
.then(newGroup => res.status(200).send(newGroup))
.catch(error => res.status(400).send(error));
  },
};
