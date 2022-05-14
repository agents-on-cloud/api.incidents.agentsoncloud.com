"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Incident extends Model {}
  Incident.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      creatorId: {
        type: DataTypes.INTEGER,
      },
      subject: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 40],
            msg: "Subject should be at most 4 characters",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 400],
            msg: "Description should be at most 400 characters",
          },
        },
      },
      severityLevel: {
        type: DataTypes.STRING,
      },
      severityDescription: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 300],
            msg: "Severity description should be at most 300 characters",
          },
        },
      },
      impactLevel: {
        type: DataTypes.STRING,
      },
      impactDescription: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 300],
            msg: "Impact description should be at most 300 characters",
          },
        },
      },
      state: {
        type: DataTypes.STRING,
      },
      referenceId: {
        type: DataTypes.INTEGER,
      },
      responderId: {
        type: DataTypes.INTEGER,
      },
      deadline: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.STRING,
      },
      reasonForCreation: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      escalationPolicy: {
        type: DataTypes.STRING,
      },
      impactFinancial: {
        type: DataTypes.BOOLEAN,
      },
      impactOperational: {
        type: DataTypes.BOOLEAN,
      },
      priority: {
        type: DataTypes.STRING,
      },
      secondaryAssignee: {
        type: DataTypes.INTEGER,
      },
      happeningTime: {
        type: DataTypes.DATE,
      },
      sendToAssignee: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Incident",
      tableName: "incident",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  Incident.associate = (models) => {
    Incident.attachments = Incident.hasMany(models.Attachment);
    Incident.comments = Incident.hasMany(models.Comment);
    Incident.hasMany(models.Updates);
    Incident.attachments = Incident.hasMany(models.ActivityLog);
    Incident.belongsToMany(models.User, {
      through: "Assignee",
      as: "assignees",
    });
    Incident.belongsToMany(models.User, {
      through: "Responder",
      as: "responders",
    });
    Incident.belongsToMany(models.ImpactedIssue, {
      through: "IncidentImpactedIssue",
    });
  };

  const { ActivityLog } = Incident.sequelize.models;
  Incident.afterUpdate(async (incident, options) => {
    const { dataValues, _previousDataValues, _changed } = incident;
    const changed = [..._changed];
    console.log({ changed });
    const newValue = {};
    const oldValue = {};
    const comment = `User noof update incident ${dataValues.subject}`;
    changed.forEach((field) => {
      if (field !== "updatedAt") {
        newValue[field] = dataValues[field];
        oldValue[field] = _previousDataValues[field];
      }
    });
    console.log({ newValue, oldValue });
    ActivityLog.create({
      incidentId: dataValues.id,
      oldValue,
      newValue,
      comment,
    });
  });
  return Incident;
};
