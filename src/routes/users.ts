import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController';

export function handleUserRoutes(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    try {
        if (url === '/api/users' && method === 'GET') {
            // throw new Error('Test');
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

        if (url?.startsWith('/api/users/') && method === 'DELETE') {
            return deleteUser(req, res);
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    } catch (error) {
        console.error('Error in route handler:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
}
