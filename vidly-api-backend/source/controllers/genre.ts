import { Request, Response, NextFunction } from 'express';
import { Genre, validateGenre } from '../models/genre';

const getAllGenres = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const genres = await Genre.find().sort('name');
    res.status(200).send(genres);
};

const createGenre = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    await genre.save();
    return res.status(200).send(genre);
};

const getGenreById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send(`Genre with id ${id} not found.`);

    return res.status(200).send(genre);
};

const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send(`Genre with id ${id} not found.`);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    await genre.save();
    return res.status(200).send(genre);
};

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send(`Genre with id ${id} not found.`);

    await genre.remove();
    return res.status(200).send(genre);
};

export { getAllGenres, createGenre, getGenreById, updateGenre, deleteGenre };
