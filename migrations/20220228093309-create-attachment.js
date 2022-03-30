"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attachment", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attachment: {
        type: Sequelize.STRING,
      },
      // incident_id: {
      //   type: Sequelize.INTEGER,
      // },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("attachment");
  },
};
