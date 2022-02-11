'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const fs_1 = __importDefault(require("fs"));
const path = require('path');
const sequelize_1 = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
fs_1.default
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
    const model = require(path.join(__dirname, file))(exports.sequelize, sequelize_1.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = exports.sequelize;
db.Sequelize = sequelize_1.Sequelize;
// module.exports = db;
exports.default = db;
