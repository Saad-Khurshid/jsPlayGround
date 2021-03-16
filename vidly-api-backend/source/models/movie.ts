import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';
import IMovie from '../interfaces/movie';
import { GenreSchema } from './genre';

const MovieSchema = new Schema<IMovie>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        genre: {
            type: GenreSchema,
            required: true
        },
        numberInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        }
    },
    {
        timestamps: true
    }
);

const validateMovie = (movie: IMovie) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        //@ts-ignore
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    });

    return schema.validate(movie);
};

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);

export { MovieSchema, Movie, validateMovie };
