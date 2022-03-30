"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {}
  Attachment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      attachment: {
        type: DataTypes.STRING,
      },
      incidentId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Attachment",
      tableName: "attachment",
      underscored: true,
    }
  );
  Attachment.associate = (models) => {
    Attachment.incident = Attachment.belongsTo(models.Incident, {
      foreignKey: "incidentId",
    });
  };
  return Attachment;
};
