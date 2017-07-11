const Usergroups = require('../models').Usergroups;

module.exports = {
  create(req, res) {
    Usergroups.create({

      groupname: req.body.groupname,
      username: req.body.username,

    })
.then(newGroup => res.status(200).send(newGroup))
.catch(error => res.status(400).send(error));
  },
};
