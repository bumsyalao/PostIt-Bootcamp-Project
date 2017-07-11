const usergroups = require('../models').Usergroups;

module.exports = {
  create(req, res) {
    return usergroups.create({

      groupname: req.body.groupname,
      username: req.body.username,

    })
.then(Usergroups => res.status(200).send(Usergroups))
.catch(error => res.status(400).send(error));
  },
};
