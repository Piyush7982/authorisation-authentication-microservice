'use strict';


// const {roledata}= require("../models")
const role= require("../util/common/enums")
const {MASTER_ADMIN,THEATRE_ADMIN,USER}= role
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [{
      role:MASTER_ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role:THEATRE_ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role:USER,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
