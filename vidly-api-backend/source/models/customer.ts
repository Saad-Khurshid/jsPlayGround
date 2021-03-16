import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';
import ICustomer from '../interfaces/customer';

const CustomerSchema: Schema = new Schema(
    {
        isGold: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const validateCustomer = (customer: ICustomer) => {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().required()
    });

    return schema.validate(customer);
};

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export { CustomerSchema, Customer, validateCustomer };
