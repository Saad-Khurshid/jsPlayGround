import request from 'supertest';
import { Genre } from '../../../source/models/genre';
import { User } from '../../../source/models/user';
import server from '../../../source/server';
describe('auth middleware', () => {
    afterEach(async () => {
        await Genre.deleteMany({});

        await server.close();
    });

    let token: string;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return 401 if no auth token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if invalid token is provided', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if valid token is provided', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});
