"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeUtility = void 0;
const IEmployee_1 = require("./IEmployee");
// import { pool } from '../config/emp_database';
class employeeUtility {
    static inputValidation(employeeTemp, checkAllParameter) {
        let name = employeeTemp.name;
        let salary = employeeTemp.salary;
        let department = employeeTemp.department;
        console.log("\nInputValidation function\n");
        //check name
        if ((typeof name !== "string" || name.trim() == "" || name.length == 0)) {
            console.log("name invalid");
            return false;
        }
        //check salary
        console.log("salary: ");
        console.log(salary);
        console.log("typeof salary: " + typeof salary);
        if (typeof salary !== "number" || salary.toString().trim() == "" || salary < 0) {
            console.log("salary invalid");
            return false;
        }
        //employeeUtility.checkWhiteSpace(department)
        if (typeof department !== "string" || !(department in IEmployee_1.Role)) {
            console.log("department invalid");
            return false;
        }
        return true; //might need more checks
    }
    //check if number is infinite or negative or isNaN
    //return true if number is invalid
    static numberCheck(num) {
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
    static removeLeadingZeros(num) {
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
    //return true if input role exists in enum Roles
    static checkInEnum(role) {
        console.log("checkInEnum: " + role);
        return Object.values(IEmployee_1.Role).includes(role);
    }
}
exports.employeeUtility = employeeUtility;
