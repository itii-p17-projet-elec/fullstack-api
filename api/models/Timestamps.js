/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Timestamps', {
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
      tableName: 'Timestamps',
      createdAt: false,
      updatedAt: false
    });
};
