var models = require('../models');

const Sequelize = require('sequelize');
const connexion = new Sequelize('solarcharger', 'solarcharger', 'solarcharger', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  // operatorsAliases: false,
  define: {
    timestamps: false,
    updatedAt: false,
    deletedAt: false
  }
});

connexion.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
module.exports = {
  insert: function (req, res) {
    var tension = req.body.tension;
    var tempBattery = req.body.tempBattery;
    var tempAmbient = req.body.tempAmbient;
    var percentageCharge = req.body.percentageCharge;
    var type = req.body.type;

    if (tension == null || tempBattery == null || tempAmbient == null || percentageCharge == null || type == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    var newDate = models.Timestamps.create({
      typeCharge: type
    }).then(function (newDate) {
      var newInfo = models.BatteryInfo.create({
        idTimestamp: newDate.idTimestamp,
        tempBattery: tempBattery,
        tempAmbient: tempAmbient,
        percentageCharge: percentageCharge
      }).then(function (newInfo) {
        return res.status(201).json({
          id: newInfo.id
        });
      }).catch(function (err) {
        return res.status(500).json({
          error: 'Cannot add new data',
          message: err
        });
      });
    });
  },
  select: function (req, res) {
    var id = req.body.id;

    if (id != null) {
      var row = models.BatteryInfo.findOne({
        where: {
          id: id
        }
      }).then(function (row) {
        return res.status(201).json(row);
      }).catch(function (err) {
        return res.status(500).json({
          error: 'Cannot find id',
          message: err
        });
      });
    } else {
      var rows = models.BatteryInfo.findAll().then(function (rows) {
        return res.status(201).json(rows);
      }).catch(function (err) {
        return res.status(500).json({
          error: 'Cannot get data',
          message: err
        });
      });
    }
  }
};