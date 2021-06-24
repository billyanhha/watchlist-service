"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
/**
 * Create Express server.
 */
const app = express_1.default();
/**
 * Express configuration.
 */
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
exports.default = app;
