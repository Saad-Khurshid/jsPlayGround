import express from 'express';
import helmet from 'helmet';
import { Application } from 'express';
import Genre from '../routes/genre';
import Customer from '../routes/customer';
import Movie from '../routes/movie';
import User from '../routes/user';
import Auth from '../routes/auth';
import errorMiddleware from '../middlewares/error';
import logger from '../lib/logger';

export default (app: Application) => {
    /** parse request */
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    /** securing headers */
    app.use(helmet());
    /** logging the requests and response */
    app.use((req, res, next) => {
        let reqUrl = req.url;
        logger.http(
            `METHOD - [${req.method}], URL - [${reqUrl}], IP - [${req.socket.remoteAddress}]`
        );

        res.on('finish', () => {
            logger.http(
                `METHOD - [${req.method}], URL - [${reqUrl}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
            );
        });

        next();
    });

    /**actual routes */
    app.use('/api/genres', Genre);
    app.use('/api/customers', Customer);
    app.use('/api/movies', Movie);
    app.use('/api/users', User);
    app.use('/api/auth', Auth);

    /** express error middleware */
    app.use(errorMiddleware);
};
