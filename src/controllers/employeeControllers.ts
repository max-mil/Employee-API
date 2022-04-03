import {RequestHandler} from 'express';
import {Role, IEmployee} from '../utils/IEmployee';
import { employeeUtility } from '../utils/utilityFunctions';
import {GeneralError, NoChange, BadRequest, NotFound} from '../utils/errors';
import {v4 as uuidv4} from 'uuid';
// import {QueryResult} from 'pg';
// import { pool } from '../config/emp_database';

const { sequelize, Employee } = require ('../models/employee');

import db from '../models';

// var pg = require("pg");
// const pool2 = new pg();
const Employees: IEmployee[] = [];

//get
export const GetAllEmployeesResponse: RequestHandler = async (req, res, next)=>{
    // console.log(">GetAllEmployeesResponse");
    // var client = new pg.Client;
    try{
        // const con = pool.getConnection(function(err:Error, con: typeof client))
        // const results = await pool.query('SELECT * FROM employees');
        const results = await db.Employee.findAll();
        // console.log("results: ");
        // console.log("____________________________");
        // console.log(results);
        // res.status(200).json({employees:results.rows});
        res.status(200).json({employees:results});
        // pool.end();
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
        // pool.end();
    }
};

//get
// export const EmployeeRequest: RequestHandler<{id:string}> = async(req, res,next)=>{
export const EmployeeRequest: RequestHandler <{id:string}> = async(req, res,next)=>{
    try{
        const id = req.params.id
        const employee = await db.Employee.findOne({
         where: {id},
        })
        if(employee==null){
            throw new NotFound("Not Found");
        }
        res.status(200).json(employee);
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
        // pool.end();
    }
};

//post
export const createEmployee: RequestHandler = async(req, res, next) => {
    
    let employee:IEmployee = req.body as IEmployee;
    const { name, salary, department } = req.body
    try {
        // console.log("name: "+employee.name + ", employee.salary: "  +employee.salary+ ", employee.department: "+employee.department);
        if( !employeeUtility.inputValidation(employee,true)){
            console.log("inputValidation function");
            throw new BadRequest("Bad Request, error in parameters");
        }
        const employee2 = await db.Employee.create({ name, salary, department })
        return res.status(200).json(employee2)   
    }catch(error){
        // res.status(500).json({errorMessage:"Server error, createEmployee function"});
        next(error);
    }
};

//put
//need to convert sql response into json object
export const updateEmployee:RequestHandler<{id:string}> = async(req, res, next) => {
    console.log("update Employee function");
    try{
        const id = req.params.id;
        // const { name, salary, department} = req.body;
        const employee = await db.Employee.findOne({ where:{id} });
        
        if(employee!=null){
            let name = !req.body.name? employee.name:req.body.name.trim();
            let salary = !req.body.salary? parseFloat(employee.salary):req.body.salary;
            let department = !req.body.department? employee.department:req.body.department;
            let employee2 = {
                "id":employee.id,
                "name": name,
                "salary": salary,
                "department": department
            };
            if(!employeeUtility.inputValidation(employee2, false)){
                throw new BadRequest("Bad Request");
            }
            
            if(employee.name == employee2.name && employee.salary == employee2.salary && employee.department==employee2.department){
                console.log("no change in employee details");
                // res.status(304).json({errorMessage:"No Change"});
                throw new NoChange("No Change");
            }else{
                // Employees[index]={...employee,...employee2};
                    console.log("Updating employee, id: "+employee.id);
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
        }else{
            throw new NotFound("Not Found");
        }
        await employee.save();
        res.status(200).json(employee);
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
    }
};

//delete
export const deleteEmployee:RequestHandler<{id:string}> = async(req, res, next) => {
    try{
        const id = req.params.id;
        const employee = await db.Employee.findOne({ where:{id} })
        if(employee!=null){
            await employee.destroy()
        }else{
            throw new NotFound("Not Found");
        }
        return res.status(204).json({message: 'User deleted!'})
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        console.log("In catch, of delete function");
        next(error);
    }
};

//.