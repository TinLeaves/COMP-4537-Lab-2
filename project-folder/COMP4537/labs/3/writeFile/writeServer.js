/**
 * Acknowledgement:
 * This code was developed with the assistance of ChatGPT.
 * ChatGPT was used to provide guidance on code structure.
 */

const http = require('http');
const url = require('url');
const fs = require('fs'); 
const message = require('./lang/en/en.js');

class WriteServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const queryObject = parsedUrl.query;

        if (req.method === 'GET' && parsedUrl.pathname.includes('writeFile')) {
            this.handleWriteFile(queryObject.text, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(message.writeError);
        }
    }

    handleWriteFile(text, res) {
        if (text) {
            const filePath = '../readFile/file.txt';  
            this.appendToFile(filePath, text, res);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message.writeError); 
        }
    }

    appendToFile(filePath, text, res) {
        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(message.writeError);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`${message.appended}${text}`);
            }
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const writeServer = new WriteServer(8000);
writeServer.start();
