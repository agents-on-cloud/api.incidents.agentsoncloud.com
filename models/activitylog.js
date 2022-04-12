"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {}
  ActivityLog.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      incidentId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      oldValue: {
        type: DataTypes.JSON,
      },
      newValue: {
        type: DataTypes.JSON,
      },
      comment: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ActivityLog",
      tableName: "activity_log",
      timestamps: true,
      underscored: true,
    }
  );
  ActivityLog.associate = (models) => {
    ActivityLog.incident = ActivityLog.belongsTo(models.Incident, {
      foreignKey: "incidentId",
    });
  };
  return ActivityLog;
};
