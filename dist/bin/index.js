"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../app/common/config/config");
const logger_1 = require("../app/common/config/logger");
const express_1 = __importDefault(require("../app/api/config/express"));
const logger = new logger_1.Logger(module);
const startService = () => {
    logger.info("Begin: Start service");
    express_1.default.listen(config_1.config.port, () => {
        logger.info(`Service start on port ${config_1.config.port}`);
    });
    logger.info("End: Start service");
};
const startApp = () => {
    startService();
};
startApp();
