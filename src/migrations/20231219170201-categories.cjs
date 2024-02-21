'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   `
    //   CREATE TABLE IF NOT EXISTS public.categories
    //   (
    //   id SERIAL PRIMARY KEY,
    //   name VARCHAR(128) COLLATE pg_catalog."default" NOT NULL,
    //   parent_category_id INTEGER,
    //   image TEXT COLLATE pg_catalog."default",
    //   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    //   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    //   );
    //   `);
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
