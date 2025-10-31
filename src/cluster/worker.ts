import http from 'http';

const port = Number(process.argv[2]);

const server = http.createServer((req, res) => {
    if (req.url === '/ping') {
        res.writeHead(200);
        res.end('pong');
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

server.listen(port, () => {
    console.log(`🧵 Worker running on port ${port}`);
});
