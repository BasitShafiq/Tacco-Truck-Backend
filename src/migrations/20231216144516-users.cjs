const { Sequelize, DataTypes } = require('sequelize');

const tableNames = ['users', 'skill'];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE enum_user_gender AS ENUM ('Male', 'Female', 'Other');

      CREATE TABLE IF NOT EXISTS public.users
      (
          id serial NOT NULL,
          name character varying(128) COLLATE pg_catalog."default",
          email character varying(128) COLLATE pg_catalog."default",
          gender enum_user_gender,
          profile_image character varying(255) COLLATE pg_catalog."default",
          password character varying(255) COLLATE pg_catalog."default",
          date_of_birth date, -- Assuming a date for the date of birth
          created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT user_pkey PRIMARY KEY (id)
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tablePromises = tableNames.map(async table => {
        await queryInterface.dropTable(table, { transaction, cascade: true });
      });

      await Promise.all(tablePromises);
    });
  }
};
