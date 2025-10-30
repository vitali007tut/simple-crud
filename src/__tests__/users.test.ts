import http from 'http';
import supertest from 'supertest';
import { users } from '../models/user';
import { handleUserRoutes } from '../routes/users';

const server = http.createServer((req, res) => {
    if (req.url?.startsWith('/api/users')) {
        return handleUserRoutes(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
});

const request = supertest(server);

describe('Users API', () => {
    let createdUserId: string;

    it('should return empty array initially', async () => {
        const res = await request.get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should create a new user', async () => {
        const res = await request.post('/api/users').send({
            username: 'Vitali',
            age: 30,
            hobbies: ['coding', 'reading'],
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdUserId = res.body.id;
    });

    it('should get the created user by id', async () => {
        const res = await request.get(`/api/users/${createdUserId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(createdUserId);
    });

    it('should update the user', async () => {
        const res = await request.put(`/api/users/${createdUserId}`).send({
            username: 'UpdatedVitali',
            age: 31,
            hobbies: ['gaming'],
        });

        expect(res.status).toBe(200);
        expect(res.body.username).toBe('UpdatedVitali');
    });

    it('should delete the user', async () => {
        const res = await request.delete(`/api/users/${createdUserId}`);
        expect(res.status).toBe(204);
    });

    it('should return 404 for deleted user', async () => {
        const res = await request.get(`/api/users/${createdUserId}`);
        expect(res.status).toBe(404);
    });
});
