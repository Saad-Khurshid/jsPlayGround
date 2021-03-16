import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';
import IUser from '../interfaces/user';

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        process.env.JWT_SECRET_KEY as jwt.Secret,
        { expiresIn: '10h' }
    );
};

const validateUser = (user: IUser) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
};

const User = mongoose.model<IUser>('User', UserSchema);

export { UserSchema, User, validateUser };
