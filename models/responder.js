"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Responder extends Model {}
  Responder.init(
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
      userId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Responder",
      tableName: "responder",
      underscored: true,
    }
  );
  // Responder.associate = (models) => {
  //   Responder.incident = Responder.hasMany(models.Incident, {
  //     foreignKey: "userId",
  //   });
  // };
  return Responder;
};
