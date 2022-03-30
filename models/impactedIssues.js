"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImpactedIssue extends Model {}
  ImpactedIssue.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      name: {
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
      modelName: "ImpactedIssue",
      tableName: "impacted_issue",
      timestamps: true,
      underscored: true,
    }
  );
  ImpactedIssue.associate = (models) => {
    ImpactedIssue.belongsToMany(models.Incident, {
      through: "IncidentImpactedIssue",
    });
  };
  return ImpactedIssue;
};
