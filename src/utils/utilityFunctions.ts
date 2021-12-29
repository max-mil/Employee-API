import {Role, Employee} from '../models/employeeModels';
import { BadRequest } from './errors';

export class employeeUtility{
    
    static inputValidation(employeeTemp:Employee, checkAllParameter:boolean):boolean{
        
        let name = employeeTemp.name;
        let salary = employeeTemp.salary;
        let department = employeeTemp.department;
        console.log("\nInputValidation function\n");
        
        //check name
        if((typeof name !== "string" || name.trim() == "" || name.length == 0) ) {
            return false;
        }
        //check salary
        if(typeof salary !== "number" || salary.toString().trim()=="" || salary < 0 ){
            return false;
        }
        //employeeUtility.checkWhiteSpace(department)
        if(typeof department !== "string" || !( department in Role) ){
            return false;
        }
        return true;    //might need more checks
        
    }

    //return true if there is white space in number
    // static checkWhiteSpace(s:number):boolean{
    //     console.log("check white space: " + s);
    //     return s.indexOf(' ') >= 0;
    // }

    //check if number is infinite or negative or isNaN
    //return true if number is invalid
    static numberCheck(num:string):boolean{
        console.log("numberCheck function: " + num);
        let parsedNumber;
        try{
            parsedNumber = parseFloat(num);
        }catch(error){
            return true;
        }
        return(!isFinite(parsedNumber) || parsedNumber<0 || isNaN(parsedNumber));
    }
    //remove leading zeros in number
    static removeLeadingZeros(num:string){
        console.log("removeLeadingZeros : "+num);
        while(num.charAt(0)=='0'){
                if(num.length==1){break};
                if(num.charAt(1)=='.'){break};
                num=num.substr(1,num.length-1);
        }
        return num;
    }

    //return true if input role exists in enum Roles
    static checkInEnum(role:any){
        console.log("checkInEnum: "+role);
        return Object.values(Role).includes(role);
    }
}
// console.log("typeof name: "+typeof(employee.name) );
//             console.log("typeof name === undefined: "+typeof(employee.name)==="undefined" );
//             console.log("typeof salary: "+typeof(employee.salary) );
//             console.log("typeof salary === undefined: "+typeof(employee.salary)==="undefined" );
            
//             console.log("typeof department: "+typeof(employee.department) );
//             console.log("typeof department === undefined: "+typeof(employee.department) === "undefined");
//             console.log("missing paramaters (all): "+check);



// static checkMissingParameters(employee:Employee, checkAllParameter:boolean):boolean{
//     console.log("In checkMissingParameters function:");
//     console.log("name: "+employee.name + ", employee.salary: "  +employee.salary+ ", employee.department: "+employee.department);
//     if(checkAllParameter){
//         console.log();
//         let check = typeof(employee.name) === undefined || typeof(employee.salary) === undefined || typeof(employee.department) === Role ? true : false;
        
//         return check;
//         // return typeof(employee.name === "undefined") || typeof(employee.salary) === "undefined" || typeof(employee.department) === "undefined" ? true : false;
//     }else{
//         let check = typeof(employee.name === undefined) && typeof(employee.salary) === undefined && typeof(employee.department) === undefined ? true : false;
//         console.log("missing paramaters (one): "+check);
//         return check;
//         // return typeof(employee.name === "undefined") && typeof(employee.salary) === "undefined" && typeof(employee.department) === "undefined" ? true : false;
//     }
// }
//========================
        //check name
        // name = name.trim();
        // console.log("trimmed name: " + name);
        // if(name.length == 0 || name == ""){
        //     return false;
        // }
        // console.log("name is valid");
        //========================
        //check salary
        //check if salary or department have white space

        //checkAllParameters returns true if parameters are missing
        // if(employeeUtility.checkMissingParameters(employeeTemp,checkAllParameter)){
        //     console.log("in check for missing parameter function");
        //     return false;
        // }

        // static inputValidation(name:string,salary:string,department:string):boolean{
        // if(employeeUtility.checkType(employeeTemp)){
        //     return false;
        // }

//remove leading zeros in salary
        // salary = employeeUtility.removeLeadingZeros(salary);

        //numberCheck return true if number is infinite or negative or isNaN
        // if(employeeUtility.numberCheck( salary )){
        //     return false;
        // }


    // static checkType(employee: Employee):boolean{
    //     return typeof(employee.name) != "string" || typeof(employee.salary) != "number" || typeof(employee.department) != "string" ? true : false;
    // }
