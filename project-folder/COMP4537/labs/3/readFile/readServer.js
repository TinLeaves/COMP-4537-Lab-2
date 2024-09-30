/**
 * Acknowledgement:
 * This code was developed with the assistance of ChatGPT.
 * ChatGPT was used to provide guidance on code structure.
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const message = require('../getDate/lang/en/en.js');

class ReadServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathParts = parsedUrl.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];

        if (req.method === 'GET' && pathParts.includes('readFile')) {
            if (fileName) {
                const filePath = `./${fileName}`;
                this.checkFileAccess(filePath, res);
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(message.readError);
        }
    }

    checkFileAccess(filePath, res) {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`${message.notFound} ${filePath}`);
            } else {
                this.readFile(filePath, res);
            }
        });
    }

    readFile(filePath, res) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(message.readError);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const readServer = new ReadServer(8001);
readServer.start();
