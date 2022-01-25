import express, {Request, Response, NextFunction} from 'express';
import 'dotenv/config';
// dotenv.config({path: '.env'});
const Pool = require('pg-pool');


const config = {
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    max: process.env.DB_MAX_CLIENTS, //max number of clients in the pool
    idleTimeoutMillis: process.env.DB_IDLE_Timeout_MS
};

export const pool = new Pool(config);

pool.on('connect', () => {
    console.log('Connected to the Database'); 
});

const empTableQuery = `
    DO $$
        BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department') THEN
            CREATE TYPE department AS ENUM ('HR', 'PS');
        END IF;
    END $$;
    CREATE TABLE IF NOT EXISTS employees(
        id      VARCHAR(300) PRIMARY KEY,
        name    VARCHAR(128) NOT NULL,
        salary  decimal NOT NULL,
        department department NOT NULL
);`;

console.log("Initialising create employees table");

pool.query(empTableQuery, (err:Error, res:Response) => {
    if(err){
        console.log('EEERRRRROOOOORR!!',err);
        pool.end();
        return;
    }
    // console.log("Results :");
    // console.log(res);
    // console.log("Data insert successfully");
    // pool.end();
});
console.log("End of create employees Table");


// pool.on('remove', () => {
//     console.log('client removed');
//     // process.exit(0);
// });

module.exports = {
    pool
};

// require('make-runnable');



//_________________________________
// pool.query(empTableQuery)
//     .then((res:Response) => {
//         console.log(res);
//         console.log("result");
//         pool.end();
//     })
//     .catch((err:Error) => {
//         console.log(err);
//         pool.end();
//     });

// const createTables = () => {
    //     const empTable = `
    //     CREATE TABLE IF NOT EXISTS
    //         department_Roles(
    //             id integer PRIMARY KEY,
    //             role VARCHAR(20) NOT NULL UNIQUE
    //         );
        
    //     INSERT INTO department_Roles(id, role) VALUES
    //         (1, 'HR');
    //     INSERT INTO department_Roles(id, role) VALUES
    //         (2, 'PS');
    
    //     CREATE TABLE IF NOT EXISTS
    //         [employees](
    //             id VARCHAR(300) PRIMARY KEY,
    //             name VARCHAR(128) NOT NULL,
    //             salary decimal NOT NULL,
    //             role integer not null,
    //             constraint fk_department_Roles foreign key (rank) references department_Roles(id)
    //         );`;
    //     pool.query(empTable)
    //             .then((res:Response) => {
    //                 console.log(res);
    //                 console.log("result");
    //                 pool.end();
    //             })
    //             .catch((err:Error) => {
    //                 console.log(err);
    //                 pool.end();
    //             });
    // };





// const {Client} = require('pg');
// const client = new Client({
//     HOST: "localhost",
//     USER: "postgres",
//     port: 5432,
//     PASSWORD: "123",
//     DB:"employees",
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle:10000
//     }
// });

// module.exports = client;

// client.connect();