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
    var voltageBattery = req.body.voltageBattery;
    var tempBattery = req.body.tempBattery;
    var tempAmbient = req.body.tempAmbient;
    var loadBattery = req.body.loadBattery;
    var currentDischarge = req.body.currentDischarge;
    var currentConsuption = req.body.currentConsuption;
    var powerSignal = req.body.powerSignal;

    if (voltageBattery == null || tempBattery == null || tempAmbient == null || loadBattery == null || currentDischarge == null || currentConsuption == null || powerSignal == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    //TODO: modify to comply with the new database architecture
    var newMeasure = models.measure.create({
    }).then(function (newMeasure) {
      var newData = models.chargerdata.create({
        MeasureId: newMeasure.IdMeasure,
        UBat: voltageBattery,
        TBat: tempBattery,
        TExt: tempAmbient,
        ICharge: loadBattery,
        IDischarge: currentDischarge,
        IConsum: currentConsuption,
        PSignal: powerSignal
      }).then(function (newData) {
        return res.status(201).json({
          id: newData.IdData
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
    var limit = req.body.limit;
    var queryColumns = 'IdData as id'
      + ', date_format(MeasureDate,\'\%Y\/\%m\/\%d \%h:\%i\') as timestamp'
      + ', UBat as voltageBattery'
      + ', TBat as tempBattery'
      + ', TExt as tempAmbient'
      + ', ICharge as loadBattery'
      + ', IDischarge as currentDischarge'
      + ', IConsum as currentConsuption'
      + ', PSignal as powerSignal'

    var queryTables = 'chargerdata, measure';
    var queryClause = 'MeasureId=IdMeasure';
    var querySort = 'ORDER BY timestamp DESC';
    var query = 'SELECT ' + queryColumns + ' FROM ' + queryTables + ' WHERE ' + queryClause + ' ' + querySort;

    if (limit != null) {
      var rows = connexion
        .query(query + ' LIMIT ' + limit, { type: connexion.QueryTypes.SELECT })
        .then(function (row) {
          return res.status(201).json(row);
        }).catch(function (err) {
          return res.status(500).json({
            error: 'Error when querying',
            message: err
          });
        });
    } else {
      var rows = connexion
        .query(query, { type: connexion.QueryTypes.SELECT })
        .then(function (rows) {
          return res.status(201).json(rows);
        })
        .catch(function (err) {
          return res.status(500).json({
            error: 'Error when querying',
            message: err
          });
        });
    }
  }
};