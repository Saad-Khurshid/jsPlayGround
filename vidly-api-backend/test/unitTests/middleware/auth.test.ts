import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import auth from '../../../source/middlewares/auth';
import { User } from '../../../source/models/user';

describe('auth middleware', () => {
    it('should populate req.user with payload of a valid JWT', () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };

        let token = new User(user).generateAuthToken();

        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req as Request, res as Response, next as NextFunction);
        //@ts-ignore
        expect(req.user).toMatchObject(user);
    });
});
