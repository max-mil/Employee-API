"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const handleErrors_1 = __importDefault(require("./middleware/handleErrors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, body_parser_1.json)());
console.log("Initiating routes");
app.use('/employee', employeeRoutes_1.default);
// app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
//   res.status(500).json({message:err.message});
// })
console.log("Initiating handleErrors");
app.use(handleErrors_1.default);
app.listen(port, () => {
    console.log("server started on http://localhost:" + port);
});
//import
//middleware
//route
//connections, app.listen
// app.get('/', function (req, res) {
//     res.send('Welcome to employee api');
//   });
//   console.log("start of app.use function");
//   //check if all values are enterred
//   try{
//     // console.log("req.body.name: "+req.body.name + ", req.body.salary: "+
//     //   req.body.salary + ", req.body.department: " +req.body.department);
//       // console.log("app.use: inputValidation check");
//       //validation
//       //add class, map req.body to class
//       //let employee = req.body;
//       // if(employeeUtility.checkMissingParameters(employee)){
//       //   console.log(" >= 1 parameters missing");
//       //   res.status(400).json({errorMessage:"Bad request"});
//       //   return;
//       // }
//       // if( !employeeUtility.inputValidation(employee,true) ){
//       //   console.log(">= 1 parameter have issue(s)");
//       //   res.status(400).json({errorMessage:"Bad request, error in parameters"});
//       //   return;
//       // }
//       console.log("in try");
//   }catch(error){
//     console.log("in catch");
//     res.status(500).json({errorMessage:err.message});
//   }
//   console.log("outside of try");
//   next();
//   //res.status(500).json({errorMessage:err.message});
// });
//input validation
// function inputValidation(name:string,salary:string,department:string):boolean{
//     console.log("\nInputValidation function\n");
//     console.log("========================");
//     //========================
//     //check name
//     name = name.trim();
//     console.log("trimmed name: " + name);
//     if(name.length == 0 || name == ""){
//         return false;
//     }
//     console.log("name is valid");
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
//       return false;
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
//   console.log("check white space: " + s);
//   return s.indexOf(' ') >= 0;
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
//   console.log("removeLeadingZeros : "+num);
//   while(num.charAt(0)=='0'){
//         if(num.length==1){break};
//         if(num.charAt(1)=='.'){break};
//         num=num.substr(1,num.length-1);
//     }
//     return num;
// }
// //check if role exists in department
// //return true if role exists in given roles
// function checkInEnum(role:string){
//   console.log("checkInEnum: "+role);
//   return Object.values(Role).includes(role);
// }
//npm init
//tsc --init
//npm install --save express body-parser
//npm install --save-dev nodemon
//tsc app.ts --w
//npm install --save-dev @types/node
//npm install --save-dev @types/express
//tsc -w
//npm start to start development server
