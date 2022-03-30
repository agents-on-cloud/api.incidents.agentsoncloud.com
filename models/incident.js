"use strict";
const { Model } = require("sequelize");
const db = require("./index");
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
      recordStatus: {
        type: DataTypes.STRING,
      },
      priority: {
        type: DataTypes.STRING,
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
    // Incident.responders = Incident.hasOne(models.Responder);
    Incident.belongsToMany(models.ImpactedIssue, {
      through: "IncidentImpactedIssue",
    });
  };
  return Incident;
};
