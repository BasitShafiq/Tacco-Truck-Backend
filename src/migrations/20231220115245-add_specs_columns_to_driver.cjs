'use strict';

// const { default: sequelize } = require('../config/sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('drivers', 'truckName', {
      type: Sequelize.STRING, // Update with your desired roles
      allowNull: false,
    });
    await queryInterface.addColumn('drivers', 'truckDescription', {
      type: Sequelize.STRING, // Update with your desired roles
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('drivers', 'truckName');

    // Remove the 'status' column
    await queryInterface.removeColumn('drivers', 'truckDescription');
  },
};
