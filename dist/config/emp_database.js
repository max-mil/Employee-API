"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// dotenv.config({path: '.env'});
// const Pool = require('pg-pool');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const config = {
    username: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    max: process.env.DB_MAX_CLIENTS,
    idleTimeoutMillis: process.env.DB_IDLE_Timeout_MS
};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
async function deleteUser(uuid) {
    const deleteEmpQuery = `DELETE FROM employees where id='${uuid}'`;
    await sequelize.query(deleteEmpQuery, { type: QueryTypes.DELETE });
}
async function closeConnection() {
    await sequelize.close();
}
async function createEmployee(data) {
    const empQuery = `INSERT INTO employee ("id","name","salary","department") VALUES ('${data.id}','${data.name}','${data.salary}','${data.department}')`;
    await sequelize.query(empQuery, { type: QueryTypes.INSERT });
}
module.exports = {
    deleteUser,
    closeConnection,
    createEmployee
};
