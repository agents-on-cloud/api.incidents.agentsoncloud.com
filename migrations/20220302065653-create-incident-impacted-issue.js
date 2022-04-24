"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("incident_impacted_issue", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      incident_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "incident", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      impacted_issue_id: {
        type: Sequelize.STRING,
        references: {
          model: "impacted_issue", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      item: {
        type: Sequelize.STRING,
      },
      impacted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("incident_impacted_issue");
  },
};
