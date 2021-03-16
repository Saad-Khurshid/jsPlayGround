import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
};

interface IAuth {
    email: string;
    password: string;
}

const validate = (user: IAuth) => {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
};

export { authenticate };
