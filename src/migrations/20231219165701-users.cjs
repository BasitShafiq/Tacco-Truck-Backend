'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //   await queryInterface.sequelize.query(`
    //   CREATE TABLE IF NOT EXISTS public.users
    //   (
    //       id serial PRIMARY KEY,
    //       name character varying(128) COLLATE pg_catalog."default",
    //       role character varying(128) COLLATE pg_catalog."default",
    //       status character varying(128) COLLATE pg_catalog."default",
    //       email character varying(128) COLLATE pg_catalog."default",
    //       gender character varying(128) COLLATE pg_catalog."default",
    //       profile_image character varying(255) COLLATE pg_catalog."default",
    //       password character varying(255) COLLATE pg_catalog."default",
    //       date_of_birth date,
    //       created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    //       updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
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
