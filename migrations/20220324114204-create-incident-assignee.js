("use strict");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("incident_assignee", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      incident_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "incident",
          key: "id",
        },
      },
      assignee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "assignee",
          key: "id",
        },
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
    await queryInterface.dropTable("incident_assignees");
  },
};
