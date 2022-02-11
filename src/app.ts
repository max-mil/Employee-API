import express, {Request, Response, NextFunction} from 'express';
import { json } from 'body-parser';
import employeeRoutes from './routes/employeeRoutes';
import { employeeUtility } from './utils/utilityFunctions';
import {Role} from './utils/IEmployee';
import handleErrors from './middleware/handleErrors'

// const { sequelize } = require('./models');
import {sequelize} from './models';
const app = express();
const port = 3000;
app.use(json()); //or express.json()?????
console.log("Initiating routes");
app.use('/employee',employeeRoutes);

//______________________

console.log("Initiating handleErrors");
app.use(handleErrors);

app.listen( port, async () => {
  console.log("server started on http://localhost:"+port);
  await sequelize.authenticate();
  
  console.log("Database synced.");
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
