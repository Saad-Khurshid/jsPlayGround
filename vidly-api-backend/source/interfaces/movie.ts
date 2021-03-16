import { Document } from 'mongoose';
import IGenre from './genre';

export default interface IMovie extends Document {
    title: string;
    genre: IGenre;
    numberInStock: number;
    dailyRentalRate: number;
}
