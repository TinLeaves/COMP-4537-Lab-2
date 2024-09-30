/**
 * Acknowledgement:
 * This code was developed with the assistance of ChatGPT.
 * ChatGPT was used to provide guidance on code structure.
 */

const http = require('http');
const url = require('url');
const utils = require('../modules/utils.js');
const message = require('../lang/en/en.js');

class GetDateServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    handleRequest(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const name = queryObject.name;

        if (req.method === 'GET' && name) {
            const currentDate = utils.getDate().toString();
            const greetingMsg = `<p style="color: blue;">${message.hello.replace('%1', name)} ${currentDate}</p>`;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(greetingMsg);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`${message.getDateError}`);
        }
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const getDateServer = new GetDateServer(8888);
getDateServer.start();
