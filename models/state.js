"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {}
  State.init(
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
      state: {
        type: DataTypes.STRING,
      },
      actionText: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "State",
      tableName: "state",
      underscored: true,
    }
  );
  return State;
};
