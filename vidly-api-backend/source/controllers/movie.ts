import { Request, Response, NextFunction } from 'express';
import { Movie, validateMovie } from '../models/movie';
import IMovie from '../interfaces/movie';
import { Genre } from '../models/genre';

const getAllMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const movies = await Movie.find().sort('title');
    res.status(200).send(movies);
};

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalide genre.');

    const movie: IMovie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock
    });

    await movie.save();
    return res.status(200).send(movie);
};

const getMovieById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send(`Movie with id ${id} not found.`);

    return res.status(200).send(movie);
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send(`Movie with id ${id} not found.`);

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalide genre.');

    movie.title = req.body.title;
    movie.genre = genre;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie.numberInStock = req.body.numberInStock;

    await movie.save();
    return res.status(200).send(movie);
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send(`Movie with id ${id} not found.`);

    await movie.remove();
    return res.status(200).send(movie);
};

export { getAllMovies, createMovie, getMovieById, updateMovie, deleteMovie };
