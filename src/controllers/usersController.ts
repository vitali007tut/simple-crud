import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../models/user';
import { parse } from 'url';
import { validate as isUUID } from 'uuid';

export function getAllUsers(res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
}

export function getUserById(req: IncomingMessage, res: ServerResponse) {
    const urlParts = parse(req.url || '', true);
    const id = urlParts.pathname?.split('/').pop();

    if (!id || !isUUID(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user ID format' }));
        return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
}
