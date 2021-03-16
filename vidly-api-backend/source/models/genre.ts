import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';
import IGenre from '../interfaces/genre';

const GenreSchema: Schema<IGenre> = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const validateGenre = (genre: IGenre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
};

const Genre = mongoose.model<IGenre>('Genre', GenreSchema);

export { Genre, GenreSchema, validateGenre };
