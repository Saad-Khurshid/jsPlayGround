import bcrypt from 'bcrypt';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { User, validateUser } from '../models/user';

const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    return res
        .status(200)
        .header('x-auth-token', token as string)
        .send(_.pick(user, ['_id', 'name', 'email']));
};

export { registerUser };
