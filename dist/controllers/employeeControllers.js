"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.EmployeeRequest = exports.GetAllEmployeesResponse = void 0;
const utilityFunctions_1 = require("../utils/utilityFunctions");
const errors_1 = require("../utils/errors");
// import {QueryResult} from 'pg';
// import { pool } from '../config/emp_database';
const { sequelize, Employee } = require('../models/employee');
const models_1 = __importDefault(require("../models"));
// var pg = require("pg");
// const pool2 = new pg();
const Employees = [];
//get
const GetAllEmployeesResponse = async (req, res, next) => {
    // console.log(">GetAllEmployeesResponse");
    // var client = new pg.Client;
    try {
        // const con = pool.getConnection(function(err:Error, con: typeof client))
        // const results = await pool.query('SELECT * FROM employees');
        const results = await models_1.default.Employee.findAll();
        // console.log("results: ");
        // console.log("____________________________");
        // console.log(results);
        // res.status(200).json({employees:results.rows});
        res.status(200).json({ employees: results });
        // pool.end();
    }
    catch (error) {
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
        // pool.end();
    }
};
exports.GetAllEmployeesResponse = GetAllEmployeesResponse;
//get
// export const EmployeeRequest: RequestHandler<{id:string}> = async(req, res,next)=>{
const EmployeeRequest = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await models_1.default.Employee.findOne({
            where: { id },
        });
        if (employee == null) {
            throw new errors_1.NotFound("Not Found");
        }
        res.status(200).json(employee);
    }
    catch (error) {
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
        // pool.end();
    }
};
exports.EmployeeRequest = EmployeeRequest;
//post
const createEmployee = async (req, res, next) => {
    let employee = req.body;
    const { name, salary, department } = req.body;
    try {
        // console.log("name: "+employee.name + ", employee.salary: "  +employee.salary+ ", employee.department: "+employee.department);
        if (!utilityFunctions_1.employeeUtility.inputValidation(employee, true)) {
            console.log("inputValidation function");
            throw new errors_1.BadRequest("Bad Request, error in parameters");
        }
        const employee2 = await models_1.default.Employee.create({ name, salary, department });
        return res.status(200).json(employee2);
    }
    catch (error) {
        // res.status(500).json({errorMessage:"Server error, createEmployee function"});
        next(error);
    }
};
exports.createEmployee = createEmployee;
//put
//need to convert sql response into json object
const updateEmployee = async (req, res, next) => {
    console.log("update Employee function");
    try {
        const id = req.params.id;
        // const { name, salary, department} = req.body;
        const employee = await models_1.default.Employee.findOne({ where: { id } });
        if (employee != null) {
            let name = !req.body.name ? employee.name : req.body.name.trim();
            let salary = !req.body.salary ? parseFloat(employee.salary) : req.body.salary;
            let department = !req.body.department ? employee.department : req.body.department;
            let employee2 = {
                "id": employee.id,
                "name": name,
                "salary": salary,
                "department": department
            };
            if (!utilityFunctions_1.employeeUtility.inputValidation(employee2, false)) {
                throw new errors_1.BadRequest("Bad Request");
            }
            if (employee.name == employee2.name && employee.salary == employee2.salary && employee.department == employee2.department) {
                console.log("no change in employee details");
                // res.status(304).json({errorMessage:"No Change"});
                throw new errors_1.NoChange("No Change");
            }
            else {
                // Employees[index]={...employee,...employee2};
                console.log("Updating employee, id: " + employee.id);
                console.log("employee2:");
                console.log(employee2);
                console.log("------");
                employee.name = name;
                employee.salary = salary;
                employee.department = department;
                console.log("result employee: ");
                console.log(employee);
                res.status(200).json(employee);
                console.log("printed status");
            }
        }
        else {
            throw new errors_1.NotFound("Not Found");
        }
        await employee.save();
        res.status(200).json(employee);
    }
    catch (error) {
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
    }
};
exports.updateEmployee = updateEmployee;
//delete
const deleteEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await models_1.default.Employee.findOne({ where: { id } });
        if (employee != null) {
            await employee.destroy();
        }
        else {
            throw new errors_1.NotFound("Not Found");
        }
        return res.status(204).json({ message: 'User deleted!' });
    }
    catch (error) {
        // res.status(500).json({errorMessage:"Server error"});
        console.log("In catch, of delete function");
        next(error);
    }
};
exports.deleteEmployee = deleteEmployee;
//.
