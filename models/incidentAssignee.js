"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IncidentAssignee extends Model {}
  IncidentAssignee.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      incidentId: {
        type: DataTypes.INTEGER,
      },
      assigneeId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "IncidentAssignee",
      tableName: "incident_assignee",
      underscored: true,
    }
  );

  return IncidentAssignee;
};
