'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
  CREATE TABLE IF NOT EXISTS public.vehicles
  (
      id SERIAL PRIMARY KEY,
      vehicle_type VARCHAR(128) COLLATE pg_catalog."default" NOT NULL,
      license_plate VARCHAR(128) COLLATE pg_catalog."default" UNIQUE NOT NULL,
      brand VARCHAR(128) COLLATE pg_catalog."default",
      model VARCHAR(128) COLLATE pg_catalog."default",
      color VARCHAR(128) COLLATE pg_catalog."default",
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tablePromises = tableNames.map(async table => {
        await queryInterface.dropTable(table, { transaction, cascade: true });
      });

      await Promise.all(tablePromises);
    });
  }
};
