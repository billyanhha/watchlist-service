"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importStar(require("winston"));
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
class Logger {
    constructor(module) {
        this.module = module;
        const logFormat = winston_1.format.printf((info) => JSON.stringify({
            time: info.timestamp,
            level: info.level,
            message: info.message,
            module: this.getModuleName(module),
            correlationId: ''
        }));
        const transportList = [
            new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.timestamp(), logFormat),
            }),
        ];
        this.winstonLogger = winston_1.default.createLogger({
            transports: transportList,
            exitOnError: false,
            silent: (config_1.config.env === 'test')
        });
    }
    /**
     * Get module dir
     * @param module
     * @returns module dir
     */
    getModuleName(module) {
        const BASE_PATH = path_1.default.resolve('.');
        const fileName = module.filename;
        return fileName.split(BASE_PATH)[1];
    }
    /**
     * Log a message with the level of "Debug".
     */
    debug(message) {
        this.createLog('debug', message);
    }
    /**
     * Log a message with the level of "Info".
     */
    info(message) {
        this.createLog('info', message);
    }
    /**
     * Log a message with the level of "Error".
     */
    error(message) {
        this.createLog('error', message);
    }
    /**
     * Log a message with the level of "Warning".
     */
    warn(message) {
        this.createLog('warn', message);
    }
    createLog(level, message) {
        const messageString = message instanceof Error && message
            ? `${message}\n${message.stack}`
            : message;
        this.winstonLogger.log(level, messageString);
    }
}
exports.Logger = Logger;
