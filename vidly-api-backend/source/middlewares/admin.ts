import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
};
