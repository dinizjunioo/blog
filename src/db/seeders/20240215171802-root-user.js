'use strict';
/**
 *  @type {import('sequelize-cli').Migration} 
 * */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', 
    [
      {
        email:"root@gmail.com",
        senha:"testroot123",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', {email:"root@gmail.com"}, {});
  }
};
