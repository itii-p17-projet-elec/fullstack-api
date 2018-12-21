/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('date_received', {
    idTimestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    _timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    typeCharge: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      tableName: 'date_received',
      createdAt: false,
      updatedAt: false,
      deletedAt: false
    });
};
