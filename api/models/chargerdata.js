/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('chargerdata', {
    IdData: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    MeasureId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'measure',
        key: 'IdMeasure'
      }
    },
    UBat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PercentBattery: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    TBat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    TExt: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ICharge: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    IDischarge: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    IConsum: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PSignal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
      tableName: 'chargerdata',
      createdAt: false,
      updatedAt: false,
      omitNull: true
    });
};
