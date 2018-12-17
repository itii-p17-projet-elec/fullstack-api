/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('batteryInfo', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idTimestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'date_received',
        key: 'idTimestamp'
      }
    },
    tempBattery: {
      type: "DOUBLE",
      allowNull: false
    },
    tempAmbient: {
      type: "DOUBLE",
      allowNull: false
    },
    percentageCharge: {
      type: DataTypes.INTEGER(100),
      allowNull: true
    }
  }, {
      tableName: 'batteryInfo',
      createdAt: false,
      updatedAt: false,
      deletedAt: false
    });
};
