import { User } from '../../../source/models/user';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const userPayload = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(userPayload);
        const token = user.generateAuthToken();
        const secret = process.env.JWT_SECRET_KEY as jwt.Secret;

        const decoded = jwt.verify(token, secret);
        expect(decoded).toMatchObject(userPayload);
    });
});
