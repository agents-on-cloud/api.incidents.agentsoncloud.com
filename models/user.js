"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
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
      modelName: "User",
      tableName: "user",
      underscored: true,
    }
  );
  User.associate = (models) => {
    User.belongsToMany(models.Incident, {
      through: "Assignee",
      as: "assignees",
    });
    User.belongsToMany(models.Incident, {
      through: "Responder",
      as: "responders",
    });
  };
  return User;
};
