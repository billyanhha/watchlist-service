import { config } from "../app/common/config/config";
import { Logger } from "../app/common/config/logger";
import app from "../app/api/config/express";
import {Connection} from "../app/common/db/connection/connection";

const logger = new Logger(module);

const startDatabase = () => {
    Connection.connectMongoose(config.mongodbUrl);
}

const startService = async () => {
    logger.info("Begin: Start service");
    await app.listen(config.port, () => {
        logger.info(`Service start on port ${config.port}`);
    })
    logger.info("End: Start service")
}

const startApp = () => {
    startDatabase();
    startService();
}

startApp();