"use strict";

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("incident", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creator_id: {
        type: Sequelize.INTEGER,
      },

      subject: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      severity_level: {
        type: Sequelize.STRING,
      },
      severity_description: {
        type: Sequelize.STRING,
      },
      impact_level: {
        type: Sequelize.STRING,
      },
      impact_description: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },

      reference_id: {
        type: Sequelize.INTEGER,
      },
      responder_id: {
        type: Sequelize.INTEGER,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.STRING,
      },
      reason_for_creation: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      escalation_policy: {
        type: Sequelize.STRING,
      },
      impact_financial: {
        type: Sequelize.BOOLEAN,
      },
      impact_operational: {
        type: Sequelize.BOOLEAN,
      },
      record_status: {
        type: Sequelize.STRING,
      },
      priority: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("incident");
  },
};
