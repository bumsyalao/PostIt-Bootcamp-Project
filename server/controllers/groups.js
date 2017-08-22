import models from '../models';

const Groups = models.Groups;
const Usergroups = models.Usergroups;

export default {
  create(req, res) {
    Groups.create({
      groupname: req.body.groupname,
    })
    .then((newGroup) => {
      Usergroups.create({
        groupId: newGroup.id,
        userId: req.decoded.userId,
      })
      .then(savedGroup => res.status(200).send(savedGroup))
      .catch(error => res.status(400).send(error.message));
    })
    .catch(error => res.status(400).send(error.message));
  },
  retrieve(req, res) {
    Groups.findAll({
      attributes: ['id', 'groupname']
    })
    .then(allGroups => res.status(200).send(allGroups))
    .catch(error => res.status(400).send(error));
  }

};
