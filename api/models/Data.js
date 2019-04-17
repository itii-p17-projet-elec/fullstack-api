/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Data', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
      tableName: 'Data',
      createdAt: false,
      updatedAt: false
    });
};
