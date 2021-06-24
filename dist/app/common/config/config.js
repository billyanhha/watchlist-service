"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.config = {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT
};
