import { ErrorRequestHandler } from 'express';
import logger from '../lib/logger';

export default ((err, req, res, next) => {
    logger.error(err.message, err);
    res.status(500).send('Something failed.');
}) as ErrorRequestHandler;
