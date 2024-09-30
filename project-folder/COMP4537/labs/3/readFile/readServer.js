const http = require('http');
const url = require('url');
const fs = require('fs');
const message = require('../lang/en/en.js');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathParts = parsedUrl.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];

    if (req.method === 'GET' && pathParts.includes('readFile')) {
        if (fileName) {
            const filePath = `./${fileName}`;

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end(`${message.notFound} ${fileName}`);
                } else {
                    fs.readFile(filePath, 'utf-8', (err, data) => {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(data);
                    });
                }
            });
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(message.readError);
    }
});

server.listen(8001, () => {
    console.log('Server is running on port 8001');
});
