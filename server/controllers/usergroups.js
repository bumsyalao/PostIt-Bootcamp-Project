const models = require('../models');

const Usergroups = models.Usergroups;
const Groups = models.Groups;

module.exports = {

  /**
   * Add user to a group
   * Route: POST: /group/:groupid/user
   *
   * @param {object} request object
   * @param {object} response object
   */
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
            username: req.decoded.username,
            groupName: foundGroup.groupName
          })
          .then(newGroup => res.status(200).send({
            newGroup,
            message: 'User succesfully added to group'
          }));
        });
      }).catch(error => res.status(400).send(error));
  },

  /**
   * List all users in a groups
   * Route: GET: /group/:groupid/users
   *
   * @param {object} request object
   * @param {object} response object
   */
  listall(req, res) {
    const groupId = req.params.groupid;
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
};
