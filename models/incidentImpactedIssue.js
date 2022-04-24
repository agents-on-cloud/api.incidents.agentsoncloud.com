"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IncidentImpactedIssue extends Model {}
  IncidentImpactedIssue.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      incidentId: {
        type: DataTypes.INTEGER,
      },
      impactedIssueId: {
        type: DataTypes.INTEGER,
      },
      item: {
        type: DataTypes.STRING,
      },
      impacted: {
        type: DataTypes.BOOLEAN,
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
      modelName: "IncidentImpactedIssue",
      tableName: "incident_impacted_issue",
      underscored: true,
    }
  );

  return IncidentImpactedIssue;
};
