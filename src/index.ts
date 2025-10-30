import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { handleUserRoutes } from './routes/users';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url?.startsWith('/api/users')) {
            return handleUserRoutes(req, res);
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    } catch (error) {
        console.error('Internal server error:', error);

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

server.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`);
});
