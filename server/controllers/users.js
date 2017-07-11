
const Users = require('../models').Users;
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();

module.exports = {

  signup(req, res) {
    return Users
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    })
    .then(newUser => res.status(200).send(newUser))
    .catch(error => res.status(400).send(error));
  },

  signin(req, res) {
    return Users
    .findOne({ where: { username: req.body.username } })

    .then((user) => {
      if (user) {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401)
            .send({ success: false, message: 'Incorrect password, please re-enter password.' });
        }
        res.status(200)
          .send({ success: true, message: 'You have logged in succesfully' });
      }
      if (!user) {
        res.status(401)
      .send({ success: false, message: 'Incorrect Username' });
      }
    });
  },
};
