import models from '../models';

const Usergroups = models.Usergroups;
const Groups = models.Groups;

export default {
  create(req, res) {
    const groupId = Number(req.params.groupid);
    Groups.findById(groupId)
    .then((foundGroup) => {
      Usergroups.findAll({ where: { userId: req.body.userId } })
        .then((user) => {
          if (user.length !== 0) {
            return res.send({ message: 'User already in group' });
          }
          Usergroups.create({
            groupId: foundGroup.id,
            userId: req.decoded.userId,
          })
          .then(newGroup => res.status(200).send(newGroup))
          .catch(error => res.status(400).send(error));
        }).catch(error => res.status(400).send(error));
    });
  },
};
