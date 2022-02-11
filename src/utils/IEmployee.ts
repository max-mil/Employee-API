//interface

export enum Role {HR,PS};
export interface IEmployee{
    id:string;
    name:string;
    salary:number;
    department:Role;
}


// export class ErrorResponse{
//     constructor(
//         public errorMessage:string
//     ){}
// }