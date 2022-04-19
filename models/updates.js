"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Updates extends Model {}
  Updates.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      incidentId: {
        type: DataTypes.INTEGER,
      },
      updateText: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Updates",
      tableName: "updates",
      underscored: true,
    }
  );
  Updates.associate = (models) => {
    Updates.belongsTo(models.Incident, {
      foreignKey: "incidentId",
    });
  };

  return Updates;
};
