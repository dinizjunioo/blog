'use strict';
/**
 *  @type {import('sequelize-cli').Migration} 
 * */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Posts','userId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Usuarios',
        key: 'id'
      },
      onDelete: 'SET NULL'
    })
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Posts','userId');
  }
};
