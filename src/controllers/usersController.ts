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

import { createUser as generateUser } from '../models/user';

export function createUser(req: IncomingMessage, res: ServerResponse) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            const { username, age, hobbies } = data;

            if (
                typeof username !== 'string' ||
                typeof age !== 'number' ||
                !Array.isArray(hobbies) ||
                !hobbies.every((h) => typeof h === 'string')
            ) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid user data' }));
                return;
            }

            const newUser = generateUser(username, age, hobbies);
            users.push(newUser);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON format' }));
        }
    });
}