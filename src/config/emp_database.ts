import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response, NextFunction} from 'express';
import { IEmployee } from '../utils/IEmployee';
// dotenv.config({path: '.env'});
// const Pool = require('pg-pool');
const Sequelize = require('sequelize');
const {QueryTypes} = require('sequelize');

const config = {
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: process.env.DB_MAX_CLIENTS, //max number of clients in the pool
    idleTimeoutMillis: process.env.DB_IDLE_Timeout_MS
};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

async function deleteUser(uuid:any){
    const deleteEmpQuery = `DELETE FROM employees where id='${uuid}'`;
    await sequelize.query(deleteEmpQuery,{type: QueryTypes.DELETE});
}

async function closeConnection(){
    await sequelize.close();
}

async function createEmployee(data:IEmployee){
    const empQuery = `INSERT INTO employee ("id","name","salary","department") VALUES ('${data.id}','${data.name}','${data.salary}','${data.department}')`;
    await sequelize.query(empQuery, {type:QueryTypes.INSERT});
}

module.exports = {
    deleteUser,
    closeConnection,
    createEmployee
};
