import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_USER);

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres"
        },
}
/*
user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")

  "username": "employee_admin",
        "password": "employee_admin",
        "database": "employees",
        "host": process.env.DB_HOST,
        "dialect": "postgres"
*/