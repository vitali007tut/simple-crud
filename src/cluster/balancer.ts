import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { v4 as uuidv4, validate as isUUID } from 'uuid';

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const users: any[] = [];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || '';
    const method = req.method || '';

    if (url === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        return;
    }

    if (url === '/api/users' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { username, age, hobbies } = data;

                if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ message: 'Invalid user data' }));
                    return;
                }

                const newUser = { id: uuidv4(), username, age, hobbies };
                users.push(newUser);
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
        return;
    }

    if (url.startsWith('/api/users/') && method === 'GET') {
        const id = url.split('/').pop();
        if (!id || !isUUID(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'Invalid ID' }));
            return;
        }

        const user = users.find((u) => u.id === id);
        if (!user) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        res.writeHead(200);
        res.end(JSON.stringify(user));
        return;
    }

    if (url.startsWith('/api/users/') && method === 'PUT') {
        const id = url.split('/').pop();
        if (!id || !isUUID(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'Invalid ID' }));
            return;
        }

        const index = users.findIndex((u) => u.id === id);
        if (index === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { username, age, hobbies } = data;

                if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ message: 'Invalid user data' }));
                    return;
                }

                users[index] = { id, username, age, hobbies };
                res.writeHead(200);
                res.end(JSON.stringify(users[index]));
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
        return;
    }

    if (url.startsWith('/api/users/') && method === 'DELETE') {
        const id = url.split('/').pop();
        if (!id || !isUUID(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'Invalid ID' }));
            return;
        }

        const index = users.findIndex((u) => u.id === id);
        if (index === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        users.splice(index, 1);
        res.writeHead(204);
        res.end();
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
});

server.listen(PORT, () => {
    console.log(`🔀 Balancer API running on port ${PORT}`);
});
