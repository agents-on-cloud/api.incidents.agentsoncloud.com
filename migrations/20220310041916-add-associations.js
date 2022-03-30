"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.addColumn("attachment", "incident_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "incident", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    }),
  ],

  down: async (queryInterface, Sequelize) => [
    await queryInterface.removeColumn(
      "attachment", // name of Source model
      "incident_id" // key we want to remove
    ),
  ],
};
