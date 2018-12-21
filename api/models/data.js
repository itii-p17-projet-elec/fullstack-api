/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('data', {
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
      tableName: 'data',
      createdAt: false,
      updatedAt: false,
      deletedAt: false
    });
};
