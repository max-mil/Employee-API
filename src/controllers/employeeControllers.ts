import {RequestHandler} from 'express';
import {Role, Employee} from '../models/employeeModels';
import { employeeUtility } from '../utils/utilityFunctions';
// import handleErrors from '../middleware/handleErrors'
import {GeneralError, NoChange, BadRequest, NotFound} from '../utils/errors';
import {v4 as uuidv4} from 'uuid';
// import { NOTFOUND } from 'dns';
// import { json } from 'body-parser';
// import { getSystemErrorMap } from 'util';

const Employees: Employee[] = [];

//get
export const GetAllEmployeesResponse: RequestHandler = (req, res,next)=>{
    console.log(">GetAllEmployeesResponse");
    try{
        res.status(200).json(Employees);
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
    }
};

//get
export const EmployeeRequest: RequestHandler<{id:string}> = (req, res,next)=>{
    try{
        console.log("EmployeeRequest");
        const employee = Employees.find(i=>i.id == req.params.id);
        if(employee){
            res.status(200).json(employee);
        }else{
            // res.status(404).json({errorMessage:"Not Found"});
            throw new NotFound("Not Found");
        }
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
    }
};

//post
export const createEmployee: RequestHandler = (req, res, next) => {
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
                    
            newEmployee.name = newEmployee.name.trim();
            newEmployee.id = uuidv4();
            console.log("employee id: "+newEmployee.id);
            
            Employees.push(newEmployee);
            res.status(200).json({createEmployee: newEmployee});
        
    }catch(error){
        // res.status(500).json({errorMessage:"Server error, createEmployee function"});
        next(error);
    }
};

//put
export const updateEmployee:RequestHandler = (req, res, next) => {
    console.log("update Employee function");
    try{
        const index = Employees.findIndex(i =>i.id === req.params.id);
        const employee = Employees[index];
        
        if(employee){
            
            let employee2 = {
                "id":employee.id,
                "name": !req.body.name? employee.name:req.body.name.trim(),
                "salary": !req.body.salary? employee.salary:req.body.salary,
                "department": !req.body.department? employee.department:req.body.department
            };
            
            //if input type is invalid, display error bad request
            //input validation
            if(!employeeUtility.inputValidation(employee2, false)){
                // res.status(400).json({errorMessage:"Bad request"});
                throw new BadRequest("Bad Request");
                // return;
            }
            //if no change in employee details
            if(employee.name == employee2.name && employee.salary == employee2.salary && employee.department==employee2.department){
                console.log("no change in employee details");
                // res.status(304).json({errorMessage:"No Change"});
                throw new NoChange("No Change");
                // return;
            }else{
                Employees[index]={...employee,...employee2};
                res.status(200).json(Employees[index]);
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
export const deleteEmployee:RequestHandler = (req, res, next) => {
    try{
        const index = Employees.findIndex(i => i.id === req.params.id);
        const employee = Employees[index];
        if(index !== -1){
            Employees.splice(index, 1);
            res.status(204).json(employee);
        }
        else{
            // res.status(404).json({errorMessage:"Not Found"});
            throw new NotFound("Not Found");
        }
    }catch(error){
        // res.status(500).json({errorMessage:"Server error"});
        next(error);
    }
};
// Employees[index].name = Employees[index].name.trim();
// req.body.name.trim();
// if(req.body.name && req.body.salary && req.body.department){
// }else {
        //     res.status(400).json({errorMessage:"Bad request"});
        // }
// if(Employees.length == 0){
                    //     newEmployee.id=0;
                    // }else{
                        // }

//if input type is invalid, display error bad request
            // if(employeeUtility.checkType(employee)){
            //     res.status(400).json({errorMessage:"Bad request"});
            //     return;
            // }

// if(employeeUtility.checkType(employee2)){
            //     res.status(400).json({errorMessage:"Bad request"});
            //     return;
            // }

// if(!req.body.name || !req.body.salary || !req.body.department){
            //     res.status(400).json({errorMessage:"Bad request"});
            //     return;
            // }
//check input type, return true if input type is invalid
// function checkType(name:any, salary:any, department:any):boolean{
//     return typeof(name)!="string" || typeof(salary)!="number" || typeof(department)!="string" ? true : false;
// }

// function inputValidation(name:string,salary:string,department:string):boolean{
//     console.log("\nInputValidation function\n");
//     console.log("========================");
//     //========================
//     //check name
//     name = name.trim();
//     console.log("name: "+name);
//     if(name.length==0|| name==""){
//         return false;
//     }
//     console.log("after whitespace check");
    
//     //========================
//     //check salary
//     //check if salary or department have white space
//     if(checkWhiteSpace(salary) || checkWhiteSpace(department) ){
//         return false;
//     }
//     console.log("after whitespace check");
//     //remove leading zeros in salary
//     salary = removeLeadingZeros(salary);
//     console.log("after remove leading zeros from salary: " +salary);
//     //check if number is infinite or negative or isNaN
//     if(numberCheck( salary )){
//         return false;
//     }
//     console.log("after number check");
//     //========================
//     //check if role exist in department
//     if(!checkInEnum(department)){
//         return false;
//     }
//     console.log("end of input validation");
//     return true;    //need more checks
// }

// //check for white space in number
// //return true if string is invalid
// function checkWhiteSpace(s:string):boolean{
//     console.log("check white space: " + s);
//     return s.indexOf(' ') >= 0;
// }
// //check if number is infinite or negative or isNaN
// //return true if number is invalid
// function numberCheck(num:string):boolean{
//     console.log("numberCheck function: " + num);
//     let parsedNumber;
//     try{
//         parsedNumber = parseFloat(num);
//     }catch(error){
//         return true;
//     }
//     return(!isFinite(parsedNumber) || parsedNumber<0 || isNaN(parsedNumber));
// }
// //remove leading zeros in number
// function removeLeadingZeros(num:string){
//     console.log("removeLeadingZeros : "+num);
//     while(num.charAt(0)=='0'){
//         if(num.length==1){break};
//         if(num.charAt(1)=='.'){break};
//         num=num.substr(1,num.length-1);
//     }
//     return num;
// }

// //check if role exists in department
// //return true if role exists in given roles
// function checkInEnum(role:string){
//     console.log("checkInEnum: "+role);
//     return Object.values(Role).includes(role);
// }

// if(employeeUtility.checkMissingParameters(employee)){
            //     console.log("in check for missing parameter function");
            //     res.status(400).json({errorMessage:"Bad request, missing values"});
            //     return;
            // }

//.