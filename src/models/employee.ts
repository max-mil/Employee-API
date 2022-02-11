'use strict';
// const {Model} = require('sequelize');
import {Model,Sequelize,DataTypes} from 'sequelize';
module.exports = (sequelize:Sequelize, dataTypes:typeof DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  Employee.init({
    id: {
      primaryKey:true,
      type:dataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false
    },
    name: {
      type:dataTypes.STRING,
      allowNull:false
    },
    salary: {
      type:dataTypes.DECIMAL,
      allowNull:false
    },
    department: {
      type:dataTypes.ENUM('HR', 'PS'),
      allowNull:false
    }
    
  }, {
    sequelize,
    tableName: 'employees',
    modelName: 'Employee',
    timestamps:false,
  });
  return Employee;
};