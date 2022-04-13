"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Responder extends Model {}
  Responder.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      incidentId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Responder",
      tableName: "responder",
      underscored: true,
    }
  );

  return Responder;
};
