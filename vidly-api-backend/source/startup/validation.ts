import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

export default () => {
    //@ts-ignore
    Joi.objectId = JoiObjectId(Joi);
};
