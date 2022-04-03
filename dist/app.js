"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const handleErrors_1 = __importDefault(require("./middleware/handleErrors"));
// const { sequelize } = require('./models');
const models_1 = require("./models");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || "5432")
// });
const port = 3001;
app.use((0, body_parser_1.json)()); //or express.json()?????
app.use((0, cors_1.default)());
console.log("Initiating routes");
app.use('/employee', employeeRoutes_1.default);
//______________________
console.log("Initiating handleErrors");
app.use(handleErrors_1.default);
// const connectToDB = async () => {
//   try {
//     await pool.connect();
//   } catch (err) {
//     console.log(err);
//   }
// };
// connectToDB();
app.listen(port, async () => {
    try {
        console.log("server started on http://localhost:" + port);
        await models_1.sequelize.authenticate();
        console.log("Database synced.");
    }
    catch (error) {
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
