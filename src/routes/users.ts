import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser, updateUser } from '../controllers/usersController';

export function handleUserRoutes(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    if (url === '/api/users' && method === 'GET') {
        return getAllUsers(res);
    }

    if (url === '/api/users' && method === 'POST') {
        return createUser(req, res);
    }

    if (url?.startsWith('/api/users/') && method === 'GET') {
        return getUserById(req, res);
    }

    if (url?.startsWith('/api/users/') && method === 'PUT') {
        return updateUser(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
}
