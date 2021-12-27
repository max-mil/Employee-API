"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.EmployeeRequest = exports.GetAllEmployeesResponse = void 0;
const employeeModels_1 = require("../models/employeeModels");
// import { json } from 'body-parser';
const uuid_1 = require("uuid");
// import { getSystemErrorMap } from 'util';
const Employees = [];
//get
const GetAllEmployeesResponse = (req, res, next) => {
    try {
        res.status(200).json(Employees);
    }
    catch (error) {
        res.status(500).json({ errorMessage: "Server error" });
    }
};
exports.GetAllEmployeesResponse = GetAllEmployeesResponse;
//get
const EmployeeRequest = (req, res, next) => {
    try {
        const employee = Employees.find(i => i.id == req.params.id);
        if (employee) {
            res.status(200).json(employee);
        }
        else {
            res.status(404).json({ errorMessage: "Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ errorMessage: "Server error" });
    }
};
exports.EmployeeRequest = EmployeeRequest;
//post
const createEmployee = (req, res, next) => {
    try {
        // if(req.body.name && req.body.salary && req.body.department){
        //input validation
        console.log("createEmployee function");
        if (!req.body.name || !req.body.salary || !req.body.department) {
            console.log("in check for missing parameter function");
            res.status(400).json({ errorMessage: "Bad request, missing values" });
            return;
        }
        console.log("after missing parameter check");
        //if input type is invalid, display error bad request
        if (checkType(req.body.name, req.body.salary, req.body.department)) {
            res.status(400).json({ errorMessage: "Bad request" });
            return;
        }
        console.log("name: " + req.body.name + ", req.body.salary: " + req.body.salary + ", req.body.department: " + req.body.department);
        if (!inputValidation(req.body.name, req.body.salary.toString(), req.body.department)) {
            console.log("in check parameter values function");
            res.status(400).json({ errorMessage: "Bad request, error in parameters" });
            return;
        }
        // req.body.name.trim();
        console.log("after input validation");
        const newEmployee = req.body;
        // if(Employees.length == 0){
        //     newEmployee.id=0;
        // }else{
        // }
        newEmployee.name = newEmployee.name.trim();
        newEmployee.id = (0, uuid_1.v4)();
        console.log("employee id: " + newEmployee.id);
        Employees.push(newEmployee);
        res.status(200).json({ createEmployee: newEmployee });
        // }else {
        //     res.status(400).json({errorMessage:"Bad request"});
        // }
    }
    catch (error) {
        res.status(500).json({ errorMessage: "Server error, createEmployee function" });
    }
};
exports.createEmployee = createEmployee;
//put
const updateEmployee = (req, res, next) => {
    console.log("update Employee function");
    try {
        const index = Employees.findIndex(i => i.id === req.params.id);
        const employee = Employees[index];
        if (employee) {
            // if(!req.body.name || !req.body.salary || !req.body.department){
            //     res.status(400).json({errorMessage:"Bad request"});
            //     return;
            // }
            let employee2 = {
                "name": !req.body.name ? employee.name : req.body.name.trim(),
                "salary": !req.body.salary ? employee.salary : req.body.salary,
                "department": !req.body.department ? employee.department : req.body.department
            };
            if (checkType(employee2.name, employee2.salary, employee2.department)) {
                res.status(400).json({ errorMessage: "Bad request" });
                return;
            }
            //if input type is invalid, display error bad request
            //input validation
            if (!inputValidation(employee2.name, employee2.salary.toString(), employee2.department)) {
                res.status(400).json({ errorMessage: "Bad request" });
                return;
            }
            //if no change in employee details
            if (employee.name == employee2.name && employee.salary == employee2.salary && employee.department == employee2.department) {
                console.log("no change in employee details");
                res.status(304).json({ errorMessage: "No Change" });
                return;
            }
            else {
                Employees[index] = { ...employee, ...employee2 };
                // Employees[index].name = Employees[index].name.trim();
                res.status(200).json(Employees[index]);
            }
        }
        else {
            res.status(404).json({ errorMessage: "Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ errorMessage: "Server error" });
    }
};
exports.updateEmployee = updateEmployee;
//delete
const deleteEmployee = (req, res, next) => {
    try {
        const index = Employees.findIndex(i => i.id === req.params.id);
        const employee = Employees[index];
        if (index !== -1) {
            Employees.splice(index, 1);
            res.status(204).json(employee);
        }
        else {
            res.status(404).json({ errorMessage: "Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ errorMessage: "Server error" });
    }
};
exports.deleteEmployee = deleteEmployee;
//check input type, return true if input type is invalid
function checkType(name, salary, department) {
    return typeof (name) != "string" || typeof (salary) != "number" || typeof (department) != "string" ? true : false;
}
function inputValidation(name, salary, department) {
    console.log("\nInputValidation function\n");
    console.log("========================");
    //========================
    //check name
    name = name.trim();
    console.log("name: " + name);
    if (name.length == 0 || name == "") {
        return false;
    }
    console.log("after whitespace check");
    //========================
    //check salary
    //check if salary or department have white space
    if (checkWhiteSpace(salary) || checkWhiteSpace(department)) {
        return false;
    }
    console.log("after whitespace check");
    //remove leading zeros in salary
    salary = removeLeadingZeros(salary);
    console.log("after remove leading zeros from salary: " + salary);
    //check if number is infinite or negative or isNaN
    if (numberCheck(salary)) {
        return false;
    }
    console.log("after number check");
    //========================
    //check if role exist in department
    if (!checkInEnum(department)) {
        return false;
    }
    console.log("end of input validation");
    return true; //need more checks
}
//check for white space in number
//return true if string is invalid
function checkWhiteSpace(s) {
    console.log("check white space: " + s);
    return s.indexOf(' ') >= 0;
}
//check if number is infinite or negative or isNaN
//return true if number is invalid
function numberCheck(num) {
    console.log("numberCheck function: " + num);
    let parsedNumber;
    try {
        parsedNumber = parseFloat(num);
    }
    catch (error) {
        return true;
    }
    return (!isFinite(parsedNumber) || parsedNumber < 0 || isNaN(parsedNumber));
}
//remove leading zeros in number
function removeLeadingZeros(num) {
    console.log("removeLeadingZeros : " + num);
    while (num.charAt(0) == '0') {
        if (num.length == 1) {
            break;
        }
        ;
        if (num.charAt(1) == '.') {
            break;
        }
        ;
        num = num.substr(1, num.length - 1);
    }
    return num;
}
//check if role exists in department
//return true if role exists in given roles
function checkInEnum(role) {
    console.log("checkInEnum: " + role);
    return Object.values(employeeModels_1.Role).includes(role);
}
//.
