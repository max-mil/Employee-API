'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// const {Model} = require('sequelize');
const sequelize_1 = require("sequelize");
module.exports = (sequelize, dataTypes) => {
    class Employee extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Employee.init({
        id: {
            primaryKey: true,
            type: dataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        department: {
            type: dataTypes.ENUM('HR', 'PS'),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'employees',
        modelName: 'Employee',
        timestamps: false,
    });
    return Employee;
};
