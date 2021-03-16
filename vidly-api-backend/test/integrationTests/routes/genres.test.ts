import request from 'supertest';
import server from '../../../source/server';
import { Genre } from '../../../source/models/genre';
import { User } from '../../../source/models/user';
import IGenre from '../../../source/interfaces/genre';

describe('/api/genres', () => {
    // beforeEach(() => { server = import('../../source/server'); });
    afterEach(async () => {
        await Genre.deleteMany({});

        server.close();
    });
    // afterAll(() => {
    //     server.close();
    // });

    describe('GET /', () => {
        it('should return all genres from database', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(
                res.body.some((g: IGenre) => g.name === 'genre1')
            ).toBeTruthy();
            expect(
                res.body.some((g: IGenre) => g.name === 'genre2')
            ).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({
                name: 'genre1'
            });
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get(`/api/genres/123`);

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' });
            expect(res.status).toBe(401);
        });

        it('should return 400 if genre.name is less than 5 character', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'genr' });
            expect(res.status).toBe(400);
        });

        it('should return 400 if genre.name is greater than 50 character', async () => {
            const token = new User().generateAuthToken();
            const name = new Array(52).join('a');

            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });
            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {
            const token = new User().generateAuthToken();
            await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'genre1' });
            const genre = await Genre.find({ name: 'genre1' });
            expect(genre).not.toBe(null);
        });

        it('should return the genre if it is saved', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'genre1' });

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});
