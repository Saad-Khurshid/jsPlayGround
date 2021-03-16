import express from 'express';
import {
    getAllGenres,
    createGenre,
    getGenreById,
    updateGenre,
    deleteGenre
} from '../controllers/genre';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';
import validateObjectId from '../middlewares/validateObjectId';

const router = express.Router();

router.get('/', getAllGenres);

router.post('/', auth, createGenre);

router.get('/:id', validateObjectId, getGenreById);

router.put('/:id', [auth, validateObjectId], updateGenre);

router.delete('/:id', [auth, admin, validateObjectId], deleteGenre);

export default router;
