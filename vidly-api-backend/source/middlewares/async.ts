/** This can be used as an additional layer on express middlewares
 * extracting try catch from routes
 * exception handling for all routes handlers
 * passes the control to next function i.e. the global error handler we defined on express main object
 *
 * use express-async-errors npm module for the same functionaliy
 */
import { Request, Response, NextFunction } from 'express';

export default (handler: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler();
        } catch (ex) {
            next(ex);
        }
    };
};
