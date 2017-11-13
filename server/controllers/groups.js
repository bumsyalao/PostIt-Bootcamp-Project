const models = require('../models');

const Groups = models.Groups;
const Usergroups = models.Usergroups;


module.exports = {

  /**
   * Create Group
   * Route: POST: /group
   *
   * @param {object} request object
   * @param {object} response object
   */
  create(req, res) {
    Groups.create({
      groupName: req.body.groupName
    })
    .then((newGroup) => {
      Usergroups.create({
        groupId: newGroup.id,
        userId: req.decoded.userId,
        username: req.decoded.username,
        groupName: newGroup.groupName
      })
      .then(savedGroup => res.status(200).send({
        savedGroup,
        message: 'group created'
      }))
      .catch((error) => {
        res.status(400).send(`user groups error: ${error.message}`);
      });
    })
    .catch(error => res.status(400).send(error.message));
  },

  /**
   * Retrieve all Groups
   * Route: GET: /groups
   *
   * @param {any} req
   * @param {any} res
   */
  retrieve(req, res) {
    Groups.findAll({
      attributes: ['id', 'groupName']
    })
    .then(allGroups => res.status(200).send({
      allGroups
    }))
    .catch(error => res.status(400).send(error));
  },

  /**
   * Retrieve one group
   * Route: /group/:groupid
   *
   * @param {object} request object
   * @param {object} response object
   */
  retrieveGroup(req, res) {
    Groups.findById(req.params.groupid)
    .then(group => res.status(200).send({
      group
    }))
    .catch(error => res.status(400).send(error));
  },
};
