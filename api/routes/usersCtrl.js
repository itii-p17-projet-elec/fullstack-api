// Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwtUtils');
var models = require('../models');

module.exports = {
  register: function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    if (username == null || password == null)
      return res.status(400).json({ error: 'missing parameters' });

    if (username.lenght() < 3 || username.lenght() > 12)
      return res.status(400).json({ error: 'invalid lenght' });

    models.User.findOne({
      where: { name: username }
    }).then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, encryptedPassword) {
          var newUser = models.User.create({
            name: username,
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
  },
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
  getUserProfile: function (req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId == null) {
      return res.status(400).json({
        error: 'token is invalid'
      });
    }

    models.User.findOne({
      attributes: ['id', 'name'],
      where: { id: userId }
    }).then(function (user) {
      if (user) {
        return res.status(201).json(user);
      } else {
        return res.status(404).json({ error: 'user not found' });
      }
    }).catch(function (err) {
      return res.status(500).json({ error: 'cannot fetch user' });
    });
  }
}