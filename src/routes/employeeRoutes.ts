import {Router} from 'express';

import {GetAllEmployeesResponse, EmployeeRequest, createEmployee, updateEmployee, deleteEmployee} from '../controllers/employeeControllers';

const router = Router();

router.get('/',GetAllEmployeesResponse);
router.get('/:id',EmployeeRequest);
router.post('/',createEmployee);
router.put('/:id',updateEmployee);
router.delete('/:id',deleteEmployee);
export default router;
//.