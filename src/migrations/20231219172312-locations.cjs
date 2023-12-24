'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS public.locations
    (
    id SERIAL PRIMARY KEY,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tablePromises = tableNames.map(async table => {
        await queryInterface.dropTable(table, { transaction, cascade: true });
      });

      await Promise.all(tablePromises);
    }
    );
  }
};
