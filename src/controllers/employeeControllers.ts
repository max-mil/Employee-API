import {RequestHandler} from 'express';
import {Role, Employee} from '../models/employeeModels';
import { employeeUtility } from '../utils/utilityFunctions';
import {GeneralError, NoChange, BadRequest, NotFound} from '../utils/errors';
import {v4 as uuidv4} from 'uuid';
// import {QueryResult} from 'pg';
import { pool } from '../config/emp_database';
var pg = require("pg");

const Employees: Employee[] = [];
// const pool2 = new pg();

//get
export const GetAllEmployeesResponse: RequestHandler = async (req, res, next)=>{
    console.log(">GetAllEmployeesResponse");
    // var client = new pg.Client;
    try{
        // const con = pool.getConnection(function(err:Error, con: typeof client))
        const results = await pool.query('SELECT * FROM employees');
        console.log(results);
        // console.log(results.rows);
        res.status(200).json({employees:results.rows});
        // pool.end();
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
        // pool.end();
    }
};

//get
// export const EmployeeRequest: RequestHandler<{id:string}> = async(req, res,next)=>{
export const EmployeeRequest: RequestHandler<{id:string}> = async(req, res,next)=>{
    try{
        const id = req.params.id;
        if(await employeeUtility.checkInDatabase(id)){
            throw new NotFound("Not Found");
        }
        const employee = await pool.query('SELECT * FROM employees WHERE id =\''+(id)+'\';');
        res.status(200).json(employee.rows);
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
        // pool.end();
    }
};

//post
export const createEmployee: RequestHandler = async(req, res, next) => {
    console.log("createEmployee function");
    try{
            //input validation
            let employee:Employee = req.body as Employee;
          
            console.log("name: "+employee.name + ", employee.salary: "  +employee.salary+ ", employee.department: "+employee.department);
            if( !employeeUtility.inputValidation(employee,true)){
                console.log("inputValidation function");
                
                // return res.status(400).json({errorMessage:"Bad request, error in parameters"});;
                throw new BadRequest("Bad Request, error in parameters");
            }
            console.log("after input validation");
            const newEmployee = (req.body as Employee);
            newEmployee.id = uuidv4();
            newEmployee.name = newEmployee.name.trim();
            
            console.log("employee id: "+newEmployee.id);
            await pool.query(
'INSERT INTO employees (id,name,salary,department) VALUES ($1,$2,$3,$4)',
[newEmployee.id,newEmployee.name,newEmployee.salary,newEmployee.department]);
            
            // Employees.push(newEmployee);
            res.status(200).json({
                "id":newEmployee.id,
                "name":newEmployee.name,
                "salary":newEmployee.salary,
                "department":newEmployee.department
            });
    }catch(error){
        // res.status(500).json({errorMessage:"Server error, createEmployee function"});
        next(error);
    }
};

//put
//need to convert sql response into json object
export const updateEmployee:RequestHandler = async(req, res, next) => {
    console.log("update Employee function");
    try{
        // const index = Employees.findIndex(i =>i.id === req.params.id);
        // const employee = Employees[index];
        const id = req.params.id;
        console.log("paramater id: " + id);
        const employee = await pool.query("SELECT * FROM employees WHERE id = '"+(id)+"';");
        console.log("________");
        console.log("employee: ");
        console.log(employee.rows[0]);
        console.log("________");
        console.log("employee id: " + employee.rows[0].id);
        console.log("employee name: " + employee.rows[0].name);
        if(await employeeUtility.checkInDatabase(id)){
            throw new NotFound("Not Found");
        }
        if(employee){
            let employee2 = {
                "id":employee.rows[0].id,
                "name": !req.body.name? employee.rows[0].name:req.body.name.trim(),
                "salary": !req.body.salary? employee.rows[0].salary:req.body.salary,
                "department": !req.body.department? employee.rows[0].department:req.body.department
            };
            //if input type is invalid, display error bad request
            //input validation
            if(!employeeUtility.inputValidation(employee2, false)){
                // res.status(400).json({errorMessage:"Bad request"});
                throw new BadRequest("Bad Request");
            }
            //if no change in employee details
            if(employee.rows[0].name == employee2.name && employee.rows[0].salary == employee2.salary && employee.rows[0].department==employee2.department){
                console.log("no change in employee details");
                // res.status(304).json({errorMessage:"No Change"});
                throw new NoChange("No Change");
            }else{
                // Employees[index]={...employee,...employee2};
                console.log("Updating employee, id: "+id);
                console.log("employee2:");
                console.log(employee2);
                console.log("------");
                await pool.query(
                    "UPDATE employees "
                    +'SET id = $1,name = $2,salary = $3,department = $4 '
                    +"WHERE id = $1;",
                    [employee2.id,employee2.name,employee2.salary,employee2.department]
                    );
                const employee = await pool.query(
                    "SELECT * FROM employees WHERE id = '"+(id)+"';");
                console.log("result employee: ");
                console.log(employee.rows[0]);
                res.status(200).json(employee.rows[0]);
                console.log("printed status");
            }
        }else{
            // res.status(404).json({errorMessage:"Not Found"});
            throw new NotFound("Not Found");
        }
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
    }
};

//delete
export const deleteEmployee:RequestHandler = async(req, res, next) => {
    try{
        // const index = Employees.findIndex(i => i.id === req.params.id);
        // const employee = Employees[index];
        const id = (req.params.id);
        if( !(await employeeUtility.checkInDatabase(id)) ){
            await pool.query(
                'DELETE FROM employees WHERE id = $1',
                [id]
            );
            res.status(204).json();
            console.log("id: " + id + " is deleted successfully");
        } else{
            throw new NotFound("Not Found");
        }
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        console.log("In catch, of delete function");
        next(error);
    }
};
// pool.on('connect', () => {
//     console.log('Connected to the Database'); 
// });
        
//         const checkId = await pool.query(
// "SELECT COUNT(*) FROM employees WHERE id = '" + id +"';"
//         );
//         console.log("checkId: " + checkId.rows[0].count);
//         console.log("______");
// "SELECT employees.id FROM employees WHERE EXISTS (SELECT employees.id FROM employees WHERE employees.id = ' "+ id +" ');"
        // "SELECT "
        // + "CASE WHEN EXISTS "
        // + "( "
        //     + "SELECT FROM employees "
        //     + "WHERE employees.id = "
        //     + id
        // + " ) "
        // + "THEN 'TRUE' "
        // + "ELSE 'FALSE' "
        // + "END;"

        // const employee = await pool.query('SELECT * FROM employees WHERE id =\''+(id)+'\';');
        // const checkId = await pool.query(
        //     'SELECT COUNT(\''+ id +'\') FROM employees'
        // );
// const checkId = await pool.query(
        //     "SELECT COUNT(*) FROM employees WHERE id = '" + id +"';"
        // );
        // console.log("checkId: " + checkId.rows[0].count);
        // console.log("______");
        
        
        // console.log(results);
        // console.log("EmployeeRequest");
        // const employee = Employees.find(i=>i.id == req.params.id);
        // if(employee){
        
        // }
        // else{
        //     // res.status(404).json({errorMessage:"Not Found"});
        //     throw new NotFound("Not Found");
        // }
        // pool.end();
//.