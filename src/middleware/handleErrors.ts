import express, {Request, Response, NextFunction} from 'express';
// import {GeneralError} from '../utils/errors';
type errType = typeof GeneralError;
const {GeneralError} = require('../utils/errors');

const handleErrors = (err:errType,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof GeneralError){
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }
    return res.status(500).json({
        status:'error',
        message:err.message
    });
}
// module.exports = handleErrors;
export default handleErrors;