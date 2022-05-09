"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("state", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      incident_id: {
        type: Sequelize.INTEGER,
      },
      state: {
        type: Sequelize.STRING,
      },
      action_text: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("state");
  },
};
