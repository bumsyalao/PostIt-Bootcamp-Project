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
            username: req.decoded.username
          })
          .then(newGroup => res.status(200).send(newGroup));
        });
      }).catch(error => res.status(400).send(error));
  },

  listall(req, res) {
    const groupId = req.params.groupId;
    Usergroups.findAll({ where: { groupId } })
      .then((users) => {
        if (users.length === 0) {
          res.status(404).send({ message: 'No Users Found' });
        } else {
          res.status(200).send({ users });
        }
      }).catch(() => {
        res.status(500).send({
          message: 'There was a server error, please try again'
        });
      });
  },
  removeUser(req, res) {
    const userId = req.body.userId;
    const groupId = req.params.groupId;
    Usergroups.findAll({ where: {
      $and: [
        { userId },
        { groupId }]
    }
    })
    .then((user) => {
      if (user.length === 0) {
        res.status(404).send({ message: 'User does not belong to this group' });
      } else {
        user.destroy()
          .then(() => {
            res.status(206).send({
              message: 'User has been removed from group' });
          }).catch(() => {
            res.status(500).send({
              message: 'There was an error, please try again' });
          });
      }
    });
  }
};
