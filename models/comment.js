"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}
  Comment.init(
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
      comment: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comment",
      underscored: true,
    }
  );
  Comment.associate = (models) => {
    Comment.incident = Comment.belongsTo(models.Incident, {
      foreignKey: "incidentId",
    });
  };
  return Comment;
};
