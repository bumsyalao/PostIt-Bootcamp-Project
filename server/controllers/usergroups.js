const Usergroups = require('../models').Usergroups;
const Groups = require('../models').Groups;

module.exports = {
  create(req, res) {
    const groupId = Number(req.params.groupid);
    Groups.findById(groupId)
    .then((foundGroup) => {
      Usergroups.create({
        groupId: foundGroup.id,
        userId: req.body.userId,
      })
      .then(newGroup => res.status(200).send(newGroup))
      .catch(error => res.status(400).send(error));
    });
  },
};
