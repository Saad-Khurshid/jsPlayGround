import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).send('Access denied. Token not provided.');

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as jwt.Secret
        );
        //@ts-ignore
        req.user = decoded;
        next();
    } catch (ex) {
        logger.error('Invalide Token', ex.message, ex);
        res.status(400).send('Invalid token');
    }
};
