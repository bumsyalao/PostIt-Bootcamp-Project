import models from '../models';

const Usergroups = models.Usergroups;
const Groups = models.Groups;

export default {
  create(req, res) {
    const groupId = Number(req.params.groupid);
    Groups.findById(groupId)
      .then((foundGroup) => {
        Usergroups.findOne({
          where: {
            $and: [
              { userId: req.decoded.userId },
              { groupId }
            ]
          }
        })
        .then((foundUserGroup) => {
          if (foundUserGroup) {
            return res.status(409).send({ message: 'User already in group' });
          }
          Usergroups.create({
            groupId: foundGroup.id,
            userId: req.decoded.userId,
          })
          .then(newGroup => res.status(200).send(newGroup));
        });
      }).catch(error => res.status(400).send(error));
  }
};
