'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //     await queryInterface.sequelize.query(`
    //   CREATE TABLE IF NOT EXISTS public.vehicles
    //   (
    //       id SERIAL PRIMARY KEY,
    //       name VARCHAR(128) COLLATE pg_catalog."default" NOT NULL,
    //       category_id INTEGER REFERENCES public.categories(id),
    //       description VARCHAR(128) COLLATE pg_catalog."default" UNIQUE NOT NULL,
    //       image VARCHAR(128) COLLATE pg_catalog."default",
    //       registration_number TEXT COLLATE pg_catalog."default",
    //       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    //       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
