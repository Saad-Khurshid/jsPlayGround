import express from 'express';
import {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
} from '../controllers/movie';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

const router = express.Router();

router.get('/', getAllMovies);

router.post('/', auth, createMovie);

router.get('/:id', getMovieById);

router.put('/:id', auth, updateMovie);

router.delete('/:id', [auth, admin], deleteMovie);

export default router;
