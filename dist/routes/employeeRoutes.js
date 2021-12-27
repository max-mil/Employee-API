"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeControllers_1 = require("../controllers/employeeControllers");
const router = (0, express_1.Router)();
router.get('/', employeeControllers_1.GetAllEmployeesResponse);
router.get('/:id', employeeControllers_1.EmployeeRequest);
router.post('/', employeeControllers_1.createEmployee);
router.put('/:id', employeeControllers_1.updateEmployee);
router.delete('/:id', employeeControllers_1.deleteEmployee);
exports.default = router;
//.
