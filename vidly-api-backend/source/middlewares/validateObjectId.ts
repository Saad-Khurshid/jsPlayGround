import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export default async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(objectId))
        return res.status(404).send('Invalid request parameter id.');

    next();
};
