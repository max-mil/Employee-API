"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_1 = require("../controllers/employees");
const router = (0, express_1.Router)();
router.get('/', employees_1.GetAllEmployeesResponse);
router.get('/:id', employees_1.EmployeeRequest);
router.post('/', employees_1.createEmployee);
router.put('/:id', employees_1.updateEmployee);
router.delete('/:id', employees_1.deleteEmployee);
exports.default = router;
//.
