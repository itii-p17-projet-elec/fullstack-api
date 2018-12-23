// Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwtUtils');
var models = require('../models');

module.exports = {
  login: function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    if (name == null || password == null)
      return res.status(400).json({ error: 'missing parameters' });

    // On vérifie qu'un utilisateur existe
    models.User.findOne({
      where: {
        name: name
      }
    }).then(function (userFound) {
      if (userFound) {

        bcrypt.compare(password, userFound.password, function (err, resBcrypt) {
          if (resBcrypt) {
            return res.status(200).json({
              id: userFound.id,
              token: jwtUtils.generateToken(userFound)
            })
          } else {
            return res.status(403).json({ error: 'invalid password' });
          }
        })

      } else {
        return res.status(404).json({ error: 'user not found' });
      }
    })
  },
  register: function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    if (name == null || password == null)
      return res.status(400).json({ error: 'missing parameters' });

    models.User.findOne({
      // attributes: ['name'],
      where: { name: name }
    }).then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, encryptedPassword) {
          var newUser = models.User.create({
            name: name,
            password: encryptedPassword
          }).then(function (newUser) {
            return res.status(201).json({
              id: newUser.id
            });
          }).catch(function (err) {
            return res.status(500).json({ error: 'cannot add user' });
          });
        });
      } else {
        return res.status(409).json({ error: 'user already exist' });
      }
    })
  }
}