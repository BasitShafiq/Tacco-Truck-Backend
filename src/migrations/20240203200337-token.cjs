'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //   await queryInterface.sequelize.query(`
    //   CREATE TABLE IF NOT EXISTS public.tokens
    //   (
    //       user_id INTEGER REFERENCES public.users(id),
    //       token TEXT COLLATE pg_catalog."default",
    //       created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    //   );
    // `);
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
