// import dotenv from 'dotenv';
import logger from './lib/logger';
import express from 'express';
import initializeEnvironmentConfig from './startup/config';
import initializeRoutes from './startup/routes';
import initializeDB from './startup/db';
import initializeValidation from './startup/validation';

initializeEnvironmentConfig();

const app: express.Application = express();

initializeDB();
initializeRoutes(app);
initializeValidation();

const server = app.listen(process.env.SERVER_PORT, () =>
    logger.info(
        `Server running on ${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`
    )
);

export default server;
