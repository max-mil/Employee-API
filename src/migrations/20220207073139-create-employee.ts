'use strict';
module.exports = {
  async up(queryInterface:any, DataTypes:any) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      salary: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      department: {
        allowNull: false,
        type: DataTypes.ENUM('HR', 'PS')
      }
    });
  },
  async down(queryInterface:any, DataTypes:any) {
    await queryInterface.dropTable('employees');
  }
};