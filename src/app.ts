import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response, NextFunction} from 'express';
import { json } from 'body-parser';
import employeeRoutes from './routes/employeeRoutes';
import { employeeUtility } from './utils/utilityFunctions';
import {Role} from './utils/IEmployee';
import handleErrors from './middleware/handleErrors'
// const { sequelize } = require('./models');
import {sequelize} from './models';
import { Pool } from "pg";
import cors from 'cors'



const app = express();
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || "5432")
// });
const port = 3001;
app.use(json()); //or express.json()?????
app.use(cors())
console.log("Initiating routes");
app.use('/employee',employeeRoutes);

//______________________

console.log("Initiating handleErrors");
app.use(handleErrors);

// const connectToDB = async () => {
//   try {
//     await pool.connect();
//   } catch (err) {
//     console.log(err);
//   }
// };
// connectToDB();

app.listen( port, async () => {
  try {
    console.log("server started on http://localhost:"+port);
    await sequelize.authenticate();
    console.log("Database synced.");
  } catch (error) {
    console.log(error);
    
  }
});



//import
//middleware
//route
//connections, app.listen

//npm init
//tsc --init
//npm install --save express body-parser
//npm install --save-dev nodemon

//tsc app.ts --w
//npm install --save-dev @types/node
//npm install --save-dev @types/express

//tsc -w
//npm start to start development server

//as of 10 Jan 2022
//npm install --save pg
//npm install make-runnable --save

//as of 13 Jan 2022
//npm install -D @types/pg

//as of 14 jan
//npm i pg-pool pg

//as of 24 jan
//npm install dotenv --save

//as of 26 jan
//npm install sequelize pg pg-hstore

//check who own directory
//ls -la /usr/local/lib/node_modules
//change root to user
//sudo chown -R (your user name): /usr/local/lib/node_modules

//npm install -g sequelize-cli
//sequelize init
//sequelize db:create, already exists
//npx sequelize-cli model:generate --name Employee --attributes id:string,Name:string, salary:decimal, department:enum:'{HR,PS}'
//psql

//as of 7 Feb 2022
//deleted models folder
//deleted dist folder, tsc -w , ctrl + c
//moved interface, IEmployee.ts to utils folder
//npm install --save @types/validator
//npm install --save-dev sequelize-cli
//npx sequelize-cli model:generate --name Employee --attributes id:UUID,name:STRING,salary:DECIMAL,department:ENUM:'{HR,PS}'
//npx sequelize-cli db:migrate
//npx sequelize-cli db:migrate:status


//docker build .
//docker run 2dbc9a7e71521454c98791060285ed5dcf4b5388da30401d46ee9b9a
//as of 9 Mar
//docker-compose up

//sudo lsof -i :5432
//sudo kill -15 149