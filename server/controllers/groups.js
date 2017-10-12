const models = require('../models');

const Groups = models.Groups;
const Usergroups = models.Usergroups;

module.exports = {

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  create(req, res) {
    Groups.create({
      groupname: req.body.groupname
    })
    .then((newGroup) => {
      Usergroups.create({
        groupId: newGroup.id,
        userId: req.decoded.userId,
        username: req.decoded.username,
        groupname: newGroup.groupname
      })
      .then(savedGroup => res.status(200).send(savedGroup))
      .catch((error) => {
        res.status(400).send(`user groups error: ${error.message}`);
      });
    })
    .catch(error => res.status(400).send(error.message));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  retrieve(req, res) {
    Groups.findAll({
      attributes: ['id', 'groupname']
    })
    .then(allGroups => res.status(200).send(allGroups))
    .catch(error => res.status(400).send(error));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  retrieveGroup(req, res) {
    Groups.findById(req.params.groupid)
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  removeGroup(req, res) {
    const groupId = req.params.groupid;
    Groups.findById(groupId)
  .then((group) => {
    group.destroy()
      .then(() => {
        res.status(206).send({
          message: 'Group has been deleted' });
      }).catch((error) => {
        res.status(500).send({
          message: 'There was an error, please try again', error });
      });
  }).catch((error) => {
    console.log(error);
  });
  }
};
