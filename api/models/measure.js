/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('measure', {
    IdMeasure: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    MeasureDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
      tableName: 'measure',
      createdAt: false,
      updatedAt: false
    });
};
