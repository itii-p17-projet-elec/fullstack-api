// Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var models = require('../models');

module.exports = {
  login: function (req, res) {
    //TODO
  },
  register: function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    if (name == null || password == null)
      return res.status(400).json({ error: 'missing parameters' });

    models.User.findOne({
      attributes: ['name'],
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
            })
          }).catch(function (err) {
            return res.status(500).json({
              error: 'cannot add user'
            });
          });
        });
      } else {
        return res.status(409).json({
          error: 'user already exist'
        });
      }
    })
  }
}