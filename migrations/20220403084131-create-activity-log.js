"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activity_log", {
      id: {
        allowNull: false,
        unique: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      incident_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      new_value: {
        type: Sequelize.JSON,
      },
      old_value: {
        type: Sequelize.JSON,
      },
      comment: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("activity_log");
  },
};
