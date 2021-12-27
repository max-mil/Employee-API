import { hrtime } from "process"

export enum Role {HR,PS};
export interface Employee{
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