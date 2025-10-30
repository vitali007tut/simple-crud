import { IncomingMessage, ServerResponse } from "http";
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server is running' }));
});

server.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`);
});
