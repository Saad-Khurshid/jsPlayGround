import { Document } from 'mongoose';

export default interface ICustomer extends Document {
    isGold: boolean;
    name: string;
    phone: string;
}
