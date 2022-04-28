"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentsReplay extends Model {
    static associate(models) {
      // define association here
    }
  }
  CommentsReplay.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      commentId: {
        type: DataTypes.INTEGER,
      },
      replayText: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "CommentsReplay",
      tableName: "comment_replay",
      underscored: true,
    }
  );
  return CommentsReplay;
};
