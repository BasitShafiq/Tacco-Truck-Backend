'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //   await queryInterface.sequelize.query(`
    //   CREATE TABLE IF NOT EXISTS public.drivers
    //   (
    //     id SERIAL PRIMARY KEY,
    //     vehicle_id INTEGER REFERENCES public.vehicles(id) ON DELETE CASCADE,
    //     user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    //     license_number character varying(128) COLLATE pg_catalog."default",
    //     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    //     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    //   );
    // `);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tablePromises = tableNames.map(async table => {
        await queryInterface.dropTable(table, { transaction, cascade: true });
      });

      await Promise.all(tablePromises);
    });
  }
};
