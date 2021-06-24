import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: '50mb' }));

export default app;