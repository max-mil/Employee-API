export class GeneralError extends Error{
    constructor(message:any){
        super();
        this.message = message;
    }
    getCode(){
        if(this instanceof NoChange){
            return 304;
        }if(this instanceof BadRequest){
            return 400;
        }if(this instanceof NotFound){
            return 404;
        }
        return 500;
    }
}
export class NoChange extends GeneralError{}
export class BadRequest extends GeneralError{}
export class NotFound extends GeneralError{}

module.exports = {
    GeneralError,
    NoChange,
    BadRequest,
    NotFound
};