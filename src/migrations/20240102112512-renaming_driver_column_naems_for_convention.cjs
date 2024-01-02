'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename 'truckName' to 'truck_name'
    await queryInterface.renameColumn('drivers', 'truckName', 'truck_name');

    // Rename 'truckDescription' to 'truck_description'
    await queryInterface.renameColumn('drivers', 'truckDescription', 'truck_description');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the rename of 'truck_name' back to 'truckName'
    await queryInterface.renameColumn('drivers', 'truck_name', 'truckName');

    // Revert the rename of 'truck_description' back to 'truckDescription'
    await queryInterface.renameColumn('drivers', 'truck_description', 'truckDescription');
  },
};
